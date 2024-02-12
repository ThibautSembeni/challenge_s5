<?php

namespace App\Controller;

use App\Entity\ClinicSchedules;
use App\Entity\Schedules;
use App\Entity\Veterinarians;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GenerateSchedulesController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private RequestStack $requestStack;

    public function __construct(EntityManagerInterface $entityManager, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->requestStack = $requestStack;
    }

    public function __invoke(Veterinarians $data): Response
    {
        $request = $this->requestStack->getCurrentRequest();
        $payload = json_decode($request->getContent(), true);

        if (!$payload['start_date'] || !$payload['end_date']) {
            throw $this->createNotFoundException('Start date and end date are required');
        }

        $payload['start_date'] = new \DateTime($payload['start_date']);
        $payload['end_date'] = new \DateTime($payload['end_date']);

        if ($payload['start_date'] > $payload['end_date']) {
            throw $this->createNotFoundException('Start date cannot be greater than end date');
        }

        $clinic = $data->getClinic();
        if (!$clinic) {
            throw $this->createNotFoundException('No clinic found for this veterinarian');
        }
        $clinicSchedules = $clinic->getClinicSchedules();
        $schedulesRepository = $this->entityManager->getRepository(Schedules::class);
        $lastSchedule = $schedulesRepository->getLastSchedule($data);
        if ($lastSchedule && $payload['start_date'] < $lastSchedule->getEndTime()) {
            throw new \Symfony\Component\HttpKernel\Exception\HttpException(422, 'You have already generated schedules for this date range. Please choose a different date range.');
        }

        $interval = new \DateInterval('P1D');
        $startDate = $payload['start_date'];
        $endDate = $payload['end_date'];
        $datePeriod = new \DatePeriod($startDate, $interval, $endDate);

        $generatedSchedules = [];

        foreach ($datePeriod as $date) {
            $dayOfWeek = $date->format('l');
            foreach ($clinicSchedules as $clinicSchedule) {
                if ($clinicSchedule->getDay() === $dayOfWeek && $clinicSchedule->getTimeslot()->isIsOpen()) {
                    $this->generateTimeSlots($date, $clinicSchedule, $data, $generatedSchedules);
                }
            }
        }

        return new Response(json_encode($generatedSchedules), Response::HTTP_CREATED, ['Content-Type' => 'application/json']);
    }

    private function generateTimeSlots(\DateTime $date, ClinicSchedules $clinicSchedule, Veterinarians $veterinarian, array &$generatedSchedules): void
    {
        $startTime = clone $clinicSchedule->getTimeslot()->getStartTime();
        $endTime = $clinicSchedule->getTimeslot()->getEndTime();
        $date->setTime($startTime->format('H'), $startTime->format('i'));

        while ($startTime < $endTime) {
            $schedule = new Schedules();
            $schedule->setVeterinarian($veterinarian);
            $schedule->setDay($date->format('l'));
            $schedule->setStartTime(clone $date);
            $schedule->setEndTime((clone $date)->modify('+30 minutes'));

            $this->entityManager->persist($schedule);
            $generatedSchedules[] = [
                'veterinarian' => $veterinarian->getUuid(),
                'day' => $date->format('l'),
                'start_time' => $date->format('H:i'),
                'end_time' => (clone $date)->modify('+30 minutes')->format('H:i'),
            ];
            $startTime->modify('+30 minutes');
            $date->modify('+30 minutes');
        }

        $this->entityManager->flush();
    }
}