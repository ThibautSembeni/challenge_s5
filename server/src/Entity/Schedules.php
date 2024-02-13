<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use App\Repository\SchedulesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SchedulesRepository::class)]
#[ApiResource(
    operations: [
        // TODO: Add the get_free_schedules_by_veterinarian operation only for user
        new GetCollection(
            uriTemplate: '/veterinarians/{uuid}/schedules',
            uriVariables: [
                'uuid' => new Link(toProperty: 'veterinarian', fromClass: Veterinarians::class)
            ],
            paginationEnabled: false,
            paginationClientEnabled: false,
            normalizationContext: ['groups' => ['schedules:read:collection']],
            name: 'get_free_schedules_by_veterinarian'
        ),
        new GetCollection(
            // TODO: Not sure about my VeterinarianScheduleVoter
            paginationEnabled: false,
            paginationClientEnabled: false,
            normalizationContext: ['groups' => ['schedules:read:collection']],
            security: 'is_granted("ROLE_VETERINARIAN")', name: 'get_all_schedules'
        ),
        new Delete(
            // TODO: Not sure about my VeterinarianScheduleVoter
            security: "is_granted('ROLE_VETERINARIAN') and object.getVeterinarian() === user.getVeterinarian()",
            securityMessage: 'Only the veterinarian can delete the schedule.',
            name: 'delete_schedule'
        )
    ]
)]
class Schedules
{
    #[Groups(['schedules:read:collection'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['schedules:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $day = null;

    #[Groups(['schedules:read:collection', 'appointments:read:collections'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $startTime = null;

    #[Groups(['schedules:read:collection', 'appointments:read:collections'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $endTime = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[ORM\JoinColumn(referencedColumnName: 'uuid')]
    private ?Veterinarians $veterinarian = null;

    #[Groups(['schedules:read:collection'])]
    #[ORM\OneToOne(mappedBy: 'schedules', cascade: ['persist', 'remove'])]
    private ?Appointments $appointments = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): static
    {
        $this->day = $day;

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(?\DateTimeInterface $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(?\DateTimeInterface $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getVeterinarian(): ?Veterinarians
    {
        return $this->veterinarian;
    }

    public function setVeterinarian(?Veterinarians $veterinarian): static
    {
        $this->veterinarian = $veterinarian;

        return $this;
    }

    public function getAppointments(): ?Appointments
    {
        return $this->appointments;
    }

    public function setAppointments(?Appointments $appointments): static
    {
        // unset the owning side of the relation if necessary
        if ($appointments === null && $this->appointments !== null) {
            $this->appointments->setSchedules(null);
        }

        // set the owning side of the relation if necessary
        if ($appointments !== null && $appointments->getSchedules() !== $this) {
            $appointments->setSchedules($this);
        }

        $this->appointments = $appointments;

        return $this;
    }
}
