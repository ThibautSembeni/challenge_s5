<?php
namespace App\Security\Voter;

use App\Entity\Auth\User;
use App\Entity\ClinicComplementaryInformation;
use App\Entity\Clinics;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ClinicComplementaryInformationVoter extends Voter
{
    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, ['CREATE_CLINIC_COMPLEMENTARY_INFORMATION', 'EDIT_CLINIC_COMPLEMENTARY_INFORMATION', 'DELETE_CLINIC_COMPLEMENTARY_INFORMATION'])) {
            return false;
        }

        if (!$subject instanceof ClinicComplementaryInformation) {
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
            case 'CREATE_CLINIC_COMPLEMENTARY_INFORMATION':
                return $this->canCreate($subject, $user);
            case 'EDIT_CLINIC_COMPLEMENTARY_INFORMATION':
                return $this->canEdit($subject, $user);
            case 'DELETE_CLINIC_COMPLEMENTARY_INFORMATION':
                return $this->canDelete($subject, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canCreate(ClinicComplementaryInformation $clinicComplementaryInformation, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $clinicComplementaryInformation->getClinicId();
    }

    private function canEdit(ClinicComplementaryInformation $clinicComplementaryInformation, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $clinicComplementaryInformation->getClinicId();
    }

    private function canDelete(ClinicComplementaryInformation $clinicComplementaryInformation, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $clinicComplementaryInformation->getClinicId();
    }
}
