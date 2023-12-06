<?php

namespace App\Security\Voter;

use App\Entity\Clinics;
use App\Entity\Auth\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ClinicVoter extends Voter
{
    protected function supports(string $attribute, $subject): bool
    {
        return $attribute === 'EDIT' && $subject instanceof Clinics;
    }

    protected function voteOnAttribute(string $attribute, $clinic, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User || !in_array('USER_MANAGER', $user->getRoles())) {
            return false;
        }

        return $clinic->getUserId()->getClinicId() === $clinic->getId();
    }
}
