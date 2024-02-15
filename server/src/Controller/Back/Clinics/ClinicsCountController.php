<?php

namespace App\Controller\Back\Clinics;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use App\Repository\ClinicsRepository;

class ClinicsCountController extends AbstractController
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

        $clinicsCount = $this->clinicsRepository->countClinicsByManager($user);

        return new Response($clinicsCount, 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}