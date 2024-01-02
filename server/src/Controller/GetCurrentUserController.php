<?php

namespace App\Controller;

use App\Entity\Auth\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetCurrentUserController extends AbstractController
{
    public function __construct()
    {
    }

    public function __invoke(): User
    {
        $currentUser = $this->getUser();
        return $currentUser;
    }
}