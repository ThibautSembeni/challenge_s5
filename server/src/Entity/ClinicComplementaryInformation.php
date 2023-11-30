<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClinicComplementaryInformationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClinicComplementaryInformationRepository::class)]
#[ApiResource]
class ClinicComplementaryInformation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['clinics:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['clinics:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'clinicComplementaryInformation')]
    private ?Clinics $clinic_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getClinicId(): ?Clinics
    {
        return $this->clinic_id;
    }

    public function setClinicId(?Clinics $clinic_id): static
    {
        $this->clinic_id = $clinic_id;

        return $this;
    }
}
