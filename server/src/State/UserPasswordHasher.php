<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;

final class UserPasswordHasher implements ProcessorInterface
{
    public function __construct(private readonly ProcessorInterface $processor, private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $oldPlainPassword = $data->getOldPassword();
        $currentHashedPassword = $data->getPassword();
        $plainPassword = $data->getPlainPassword();
        $newPlainPassword = $data->getNewPassword();


        // if update password
        if ($oldPlainPassword && $currentHashedPassword && $newPlainPassword) {
            if (!$this->passwordHasher->isPasswordValid($data, $oldPlainPassword)) {
                throw new AccessDeniedException('Invalid password');
            }

            $hashedPassword = $this->passwordHasher->hashPassword(
                $data,
                $newPlainPassword
            );
            $data->setPassword($hashedPassword);
            $data->eraseCredentials();

            // if create password
        } else if ($plainPassword && !$currentHashedPassword) {
            $hashedPassword = $this->passwordHasher->hashPassword(
                $data,
                $plainPassword
            );
            $data->setPassword($hashedPassword);
            $data->eraseCredentials();
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}