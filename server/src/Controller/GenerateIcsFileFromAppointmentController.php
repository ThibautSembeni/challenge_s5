<?php

namespace App\Controller;

use App\Entity\Appointments;
use App\Repository\AppointmentHistoryRepository;
use DateInterval;
use DateTimeImmutable;
use Eluceo\iCal\Domain\Entity\Calendar;
use Eluceo\iCal\Domain\Entity\Event;
use Eluceo\iCal\Domain\ValueObject\Alarm;
use Eluceo\iCal\Domain\ValueObject\DateTime;
use Eluceo\iCal\Domain\ValueObject\EmailAddress;
use Eluceo\iCal\Domain\ValueObject\GeographicPosition;
use Eluceo\iCal\Domain\ValueObject\Location;
use Eluceo\iCal\Domain\ValueObject\Organizer;
use Eluceo\iCal\Domain\ValueObject\TimeSpan;
use Eluceo\iCal\Presentation\Factory\CalendarFactory;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GenerateIcsFileFromAppointmentController extends AbstractController
{
    public function __construct()
    {
    }

    public function __invoke(Appointments $appointments): Response
    {

        $user = $this->getUser();
        if ($appointments->getUserID() !== $user) {
            throw $this->createAccessDeniedException('You are not allowed to access this resource!');
        }

        $event = new Event();
        $event
            ->setSummary('RDV chez ' . $appointments->getVeterinarian()->getFirstname() . ' ' . $appointments->getVeterinarian()->getLastname())
            ->setDescription('Rendez-vous chez ' . $appointments->getVeterinarian()->getFirstname() . ' ' . $appointments->getVeterinarian()->getLastname() . ' pour ' . $appointments->getService()->getDescription())
            ->setOrganizer(new Organizer(
                new EmailAddress($appointments->getVeterinarian()->getEmail()),
                $appointments->getVeterinarian()->getFirstname() . ' ' . $appointments->getVeterinarian()->getLastname()
            ))
            ->setLocation((new Location($appointments->getVeterinarian()->getClinic()->getAddress() . ', ' . $appointments->getVeterinarian()->getClinic()->getCity() . ' ' . $appointments->getVeterinarian()->getClinic()->getPostalCode(), $appointments->getVeterinarian()->getClinic()->getName()))
                ->withGeographicPosition(new GeographicPosition($appointments->getVeterinarian()->getClinic()->getLatitude(), $appointments->getVeterinarian()->getClinic()->getLongitude()))
            )
            ->setOccurrence(new TimeSpan(
                new DateTime(DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $appointments->getDate()->format('Y-m-d H:i:s')), true),
                new DateTime(DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $appointments->getDate()->format('Y-m-d H:i:s'))->modify('+30 minutes'), true)
            ))
            ->addAlarm(
                new Alarm(
                    new Alarm\DisplayAction('Reminder: the meeting starts in 15 minutes!'),
                    (new Alarm\RelativeTrigger(DateInterval::createFromDateString('-15 minutes')))->withRelationToEnd()
                )
            );

        $calendar = new Calendar([$event]);

        $componentFactory = new CalendarFactory();
        $calendarComponent = $componentFactory->createCalendar($calendar);

        return new Response(
            $calendarComponent,
            200,
            [
                'Content-Type' => 'text/calendar; charset=utf-8',
                'Content-Disposition' => 'attachment; filename="rendez-vous.ics"',
            ]
        );
    }
}