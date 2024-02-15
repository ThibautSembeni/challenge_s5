<?php

namespace App\EventListener;

use App\Entity\Auth\User;
use App\Entity\Veterinarians;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Events;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use JetBrains\PhpStorm\NoReturn;
use Random\RandomException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class VeterinariansEventSubscriber implements EventSubscriber
{
    private MailerInterface $mailer;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(MailerInterface $mailer, UserPasswordHasherInterface $passwordHasher)
    {
        $this->mailer = $mailer;
        $this->passwordHasher = $passwordHasher;
    }

    public function getSubscribedEvents()
    {
        return [
            Events::postPersist,
            Events::postRemove
        ];
    }

    /**
     * @throws OptimisticLockException
     * @throws RandomException
     * @throws TransportExceptionInterface
     * @throws ORMException
     */
    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        $entityManager = $args->getObjectManager();

        if ($entity instanceof Veterinarians) {
            $this->sendEmail($entity, $entityManager);
        }
    }

    #[NoReturn] public function postRemove(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        $entityManager = $args->getObjectManager();

        if ($entity instanceof Veterinarians) {
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $entity->getEmail()]);

            if ($user) {
                $entityManager->remove($user);
                $entityManager->flush();
            }
        }
    }

    /**
     * @throws OptimisticLockException
     * @throws TransportExceptionInterface
     * @throws RandomException
     * @throws ORMException
     */
    private function sendEmail(Veterinarians $veterinarian, EntityManager $entityManager): void
    {
        $user = new User();
        $user->setEmail($veterinarian->getEmail());
        $user->setFirstname($veterinarian->getFirstname());
        $user->setLastname($veterinarian->getLastname());
        $user->setRoles(['ROLE_VETERINARIAN']);

        $password = bin2hex(random_bytes(8));
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        $user->setVeterinarian($veterinarian);

        $entityManager->persist($user);
        $entityManager->flush();

        $email = (new Email())
            ->from('inscription@vetcare.fr')
            ->to($veterinarian->getEmail())
            ->subject('Bienvenue chez VetCare')
            ->text('Voici ton mot de passe temporaire, je te conseille de le changer dès ta première connexion : '. $password .' Bienvenue chez VetoSia !');

        $this->mailer->send($email);
    }
}