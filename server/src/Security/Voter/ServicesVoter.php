<?php

namespace App\Security\Voter;

use App\Entity\Services;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class ServicesVoter extends Voter
{
    public const UPDATE = 'UPDATE_SERVICE';
    public const DELETE = 'DELETE_SERVICE';

    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::UPDATE, self::DELETE])
            && $subject instanceof Services;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        assert($subject instanceof Services);
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        return match ($attribute) {
            self::UPDATE => $this->security->isGranted('ROLE_VETERINARIAN') && $user->getVeterinarian() === $subject->getVeterinarian(),
            self::DELETE => $this->security->isGranted('ROLE_VETERINARIAN') && $user->getVeterinarian() === $subject->getVeterinarian(),
            default => false,
        };

    }
}
