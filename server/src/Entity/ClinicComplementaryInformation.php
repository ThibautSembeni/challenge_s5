<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ClinicComplementaryInformationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClinicComplementaryInformationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['clinicComplementaryInformation:read:collection']]),
        new Post(normalizationContext: ['groups' => ['clinicComplementaryInformation:read:collection:write:create']], securityPostDenormalize: "is_granted('CREATE_CLINIC_COMPLEMENTARY_INFORMATION', object)"),
        new Delete(security: "is_granted('DELETE_CLINIC_COMPLEMENTARY_INFORMATION', object)"),
    ],
    normalizationContext: ['groups' => ['clinicComplementaryInformation:read:collection']],
    paginationPartial: false,
)]
class ClinicComplementaryInformation
{
    #[Groups(['clinics:read', 'clinicComplementaryInformation:read:collection'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['clinics:read', 'clinicComplementaryInformation:read:collection'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['clinics:read', 'clinicComplementaryInformation:read:collection'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'clinicComplementaryInformation')]
    #[ORM\JoinColumn(referencedColumnName: 'uuid')]
    private ?Clinics $clinic = null;

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

    public function getClinic(): ?Clinics
    {
        return $this->clinic;
    }

    public function setClinic(?Clinics $clinic): static
    {
        $this->clinic = $clinic;

        return $this;
    }
}
