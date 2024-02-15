<?php

namespace App\Controller\Back\Clinics;

use App\Entity\Auth\User;
use App\Repository\FeedbacksRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use App\Repository\ClinicsRepository;
use Symfony\Component\Serializer\SerializerInterface;

class FeedbacksController extends AbstractController
{
    private $security;
    private $feedbacksRepository;

    public function __construct(Security $security, FeedbacksRepository $feedbacksRepository)
    {
        $this->security = $security;
        $this->feedbacksRepository = $feedbacksRepository;
    }

    public function __invoke(SerializerInterface $serializer): ?JsonResponse
    {
        $user = $this->security->getUser();
        if (!$user) {
            return new Response('User not authenticated', Response::HTTP_FORBIDDEN);
        }

        $feedbacks = $this->feedbacksRepository->getFeedbacksByVeterinarianId($user);

        $jsonFeedbacks = $serializer->serialize($feedbacks, 'json', ['groups' => 'feedbacks:read']);
        return new JsonResponse($jsonFeedbacks, 200, [], true);
    }
}