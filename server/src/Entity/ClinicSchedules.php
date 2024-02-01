<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ClinicSchedulesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClinicSchedulesRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['clinicSchedule:read:collection']]),
        new Post(normalizationContext: ['groups' => ['clinicSchedule:write:create']], securityPostDenormalize: "is_granted('CREATE_CLINIC_SCHEDULE', object)"),
        new Get(normalizationContext: ['groups' => ['clinicSchedule:read']]),
        new Put(),
        new Delete(security: "is_granted('DELETE_CLINIC_SCHEDULE', object)"),
        new Patch()
    ],
    normalizationContext: ['groups' => ['clinicSchedule:read:collection']],
    paginationPartial: false,
)]
class ClinicSchedules
{
    #[Groups(['clinics:read', 'clinicSchedule:read:collection'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['clinicSchedule:write:create', 'clinicSchedule:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'clinicSchedules')]
    private ?Clinics $clinic = null;

    #[Groups(['clinics:read', 'clinicSchedule:write:create', 'clinicSchedule:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'clinicSchedules')]
    private ?TimeSlots $timeslot = null;

    #[Groups(['clinics:read', 'clinicSchedule:write:create', 'clinicSchedule:read:collection'])]
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $day = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTimeslot(): ?TimeSlots
    {
        return $this->timeslot;
    }

    public function setTimeslot(?TimeSlots $timeslot): static
    {
        $this->timeslot = $timeslot;

        return $this;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(?string $day): static
    {
        $this->day = $day;

        return $this;
    }
}
