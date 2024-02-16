<?php

namespace App\Security\Voter;

use App\Entity\Auth\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    public const READ = 'READ_USER';
    public const UPDATE = 'UPDATE_USER';
    public const DELETE = 'DELETE_USER';

    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::READ, self::UPDATE, self::DELETE])
            && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        assert($subject instanceof User);
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        return match ($attribute) {
            self::READ => $this->security->isGranted('ROLE_ADMIN') || $user === $subject,
            self::UPDATE => $this->security->isGranted('ROLE_ADMIN') || $user === $subject,
            self::DELETE => $this->security->isGranted('ROLE_ADMIN') || $user === $subject,
            default => false,
        };

    }
}
