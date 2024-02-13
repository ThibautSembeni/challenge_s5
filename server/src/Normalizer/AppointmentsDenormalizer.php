<?php

declare(strict_types=1);

namespace App\Normalizer;

use App\Entity\Appointments;
use App\Entity\Pets;
use App\Entity\Services;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class AppointmentsDenormalizer implements DenormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected PasswordHasherFactoryInterface $hasher,
        protected ObjectNormalizer $normalizer,
        protected EntityManagerInterface $entityManager,
    ) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = []): mixed
    {
        $appointments = $this->normalizer->denormalize($data, $type, $format, $context);

        assert($appointments instanceof Appointments);

        $appointments->setUserID($this->security->getUser());

        if (isset($data['pet'])) {
            $uuid = basename($data['pet']);
            $pet = $this->entityManager->getRepository(Pets::class)->find($uuid);
            $appointments->setPet($pet);
        }

        if (isset($data['service'])) {
            $id = basename($data['service']);
            $service = $this->entityManager->getRepository(Services::class)->find($id);
            $appointments->setService($service);
        }

        return $appointments;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === Appointments::class;
    }
}
