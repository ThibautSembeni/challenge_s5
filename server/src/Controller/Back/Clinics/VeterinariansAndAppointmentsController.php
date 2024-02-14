<?php

namespace App\Controller\Back\Clinics;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use App\Repository\ClinicsRepository;

class VeterinariansAndAppointmentsController extends AbstractController
{
    private $security;
    private $clinicsRepository;

    public function __construct(Security $security, ClinicsRepository $clinicsRepository)
    {
        $this->security = $security;
        $this->clinicsRepository = $clinicsRepository;
    }

    public function __invoke(): Response
    {
        $user = $this->security->getUser();
        if (!$user) {
            return $this->json(['error' => 'User not authenticated'], Response::HTTP_FORBIDDEN);
        }

        $clinic = $this->clinicsRepository->findClinicsByManager(['manager' => $user]);
        if (!$clinic) {
            return $this->json(['error' => 'Clinic not found or you are not a manager of any clinic'], Response::HTTP_NOT_FOUND);
        }

        $query = $this->clinicsRepository->findScheduledAppointmentsInManagerClinics($user, 'scheduled');
        dd($query);

        return new Response($query, 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}
