<?php
namespace App\Security\Voter;

use App\Entity\Appointments;
use App\Entity\Auth\User;
use App\Entity\Clinics;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AppointmentVoter extends Voter
{
    public const READ = 'READ_APPOINTMENT';
    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, [self::READ]) && !$subject instanceof Appointments;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        assert($subject instanceof Appointments);

        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        return match ($attribute) {
            self::READ => $this->canRead($subject, $user),
            default => false,
        };

    }

    private function canRead(Appointments $appointments, User $user): bool
    {
        if ($this->security->isGranted('ROLE_VETERINARIAN') && $appointments->getVeterinarian() === $user->getVeterinarian()) {
            return true;
        }

        return false;
    }
}
