<?php

namespace App\Controller\Back\Clinics;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use App\Repository\ClinicsRepository;

class VeterinariansCountController extends AbstractController
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
            return new Response('User not authenticated', Response::HTTP_FORBIDDEN);
        }
        
        $clinic = $this->clinicsRepository->findClinicsByManager(['manager' => $user]);
        $veterinariansCount = $this->clinicsRepository->countVeterinariansInClinic($clinic);

        return new Response($veterinariansCount);
    }
}