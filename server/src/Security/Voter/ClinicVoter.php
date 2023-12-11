<?php
namespace App\Security\Voter;

use App\Entity\Auth\User;
use App\Entity\Clinics;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ClinicVoter extends Voter
{
    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, ['CREATE_CLINIC', 'EDIT_CLINIC', 'DELETE_CLINIC'])) {
            return false;
        }

        if (!$subject instanceof Clinics) {
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
            case 'CREATE_CLINIC':
                return $this->canCreate();
            case 'EDIT_CLINIC':
                return $this->canEdit($subject, $user);
            case 'DELETE_CLINIC':
                return $this->canDelete($subject, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canCreate(): bool
    {
        return $this->security->isGranted('ROLE_MANAGER');
    }

    private function canEdit(Clinics $clinics, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $clinics;
    }

    private function canDelete(Clinics $clinics, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $clinics;
    }
}
