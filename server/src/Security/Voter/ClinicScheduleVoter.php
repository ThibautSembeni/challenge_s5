<?php
namespace App\Security\Voter;

use App\Entity\ClinicSchedules;
use App\Entity\Auth\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ClinicScheduleVoter extends Voter
{
    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, ['CREATE_CLINIC_SCHEDULE', 'DELETE_CLINIC_SCHEDULE'])) {
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

        switch ($attribute) {
            case 'CREATE_CLINIC_SCHEDULE':
                return $this->canCreate($subject, $user);
            case 'DELETE_CLINIC_SCHEDULE':
                return $this->canDelete($subject, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canCreate(ClinicSchedules $clinicSchedule, User $user): bool
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        if ($this->security->isGranted('ROLE_MANAGER')) {
            foreach ($user->getClinic() as $userClinic) {
                if ($userClinic === $clinicSchedule->getClinic()) {
                    return true;
                }
            }
        }

        return false;
    }

    private function canDelete(ClinicSchedules $clinicSchedule, User $user): bool
    {
        return $this->canCreate($clinicSchedule, $user);
    }
}
