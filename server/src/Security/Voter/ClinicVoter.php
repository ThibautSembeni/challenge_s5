<?php
namespace App\Security\Voter;

use App\Entity\ClinicSchedules;
use App\Entity\Auth\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class ClinicVoter extends Voter
{
    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, ['DELETE'])) {
            return false;
        }

        if (!$subject instanceof ClinicSchedules) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        $clinicSchedule = $subject;

        switch ($attribute) {
            case 'DELETE':
                return $this->canDelete($clinicSchedule, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canDelete(ClinicSchedules $clinicSchedule, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $clinicSchedule->getClinicId();
    }
}
