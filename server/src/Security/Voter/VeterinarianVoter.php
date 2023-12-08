<?php
namespace App\Security\Voter;

use App\Entity\Auth\User;
use App\Entity\Veterinarians;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class VeterinarianVoter extends Voter
{
    public function __construct(
        private readonly Security $security,
    ) {
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, ['CREATE_VETERINARIAN', 'EDIT_VETERINARIAN', 'DELETE_VETERINARIAN'])) {
            return false;
        }

        if (!$subject instanceof Veterinarians) {
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
            case 'CREATE_VETERINARIAN':
                return $this->canCreate($subject, $user);
            case 'EDIT_VETERINARIAN':
                return $this->canEdit($subject, $user);
            case 'DELETE_VETERINARIAN':
                return $this->canDelete($subject, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canCreate(Veterinarians $veterinarians, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $veterinarians->getClinic();
    }

    private function canEdit(Veterinarians $veterinarians, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $veterinarians->getClinic();
    }

    private function canDelete(Veterinarians $veterinarians, User $user): bool
    {
        return $this->security->isGranted('ROLE_MANAGER') && $user->getClinic() === $veterinarians->getClinic();
    }
}
