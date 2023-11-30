<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use App\Repository\VeterinariansRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: VeterinariansRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['veterinarians:read']]),
        new Post(normalizationContext: ['groups' => ['veterinarians:write:create']], security: "is_granted('PUBLIC_ACCESS')"),
        new Get(normalizationContext: ['groups' => ['veterinarians:read']]),
        new Put(),
        new Delete(),
        new Patch()
    ],
)]
class Veterinarians
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier: false)]
    private ?int $id = null;

    #[Groups(['veterinarians:read', 'clinics:read'])]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ApiProperty(identifier: true)]
    private Uuid $uuid;

    #[Groups(['veterinarians:read', 'veterinarians:write:create', 'clinics:read'])]
    #[ORM\Column(length: 100)]
    private ?string $lastname = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create', 'clinics:read'])]
    #[ORM\Column(length: 100)]
    private ?string $firstname = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;


    #[Groups(['veterinarians:read', 'veterinarians:write:create'])]
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $phone = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create', 'clinics:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $specialties = null;

    #[ORM\ManyToOne(inversedBy: 'veterinarians')]
    private ?Clinics $clinic = null;

    #[ORM\OneToMany(mappedBy: 'veterinarianID', targetEntity: Appointments::class)]
    private Collection $appointments;

    #[ORM\OneToMany(mappedBy: 'veterinarianID', targetEntity: AppointmentHistory::class)]
    private Collection $appointmentHistories;

    #[ORM\OneToMany(mappedBy: 'veterinarianID', targetEntity: Schedules::class)]
    private Collection $schedules;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
        $this->appointmentHistories = new ArrayCollection();
        $this->schedules = new ArrayCollection();
        $this->uuid = Uuid::v4();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getSpecialties(): ?string
    {
        return $this->specialties;
    }

    public function setSpecialties(?string $specialties): static
    {
        $this->specialties = $specialties;

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

    /**
     * @return Collection<int, Appointments>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointments $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setVeterinarianID($this);
        }

        return $this;
    }

    public function removeAppointment(Appointments $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getVeterinarianID() === $this) {
                $appointment->setVeterinarianID(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, AppointmentHistory>
     */
    public function getAppointmentHistories(): Collection
    {
        return $this->appointmentHistories;
    }

    public function addAppointmentHistory(AppointmentHistory $appointmentHistory): static
    {
        if (!$this->appointmentHistories->contains($appointmentHistory)) {
            $this->appointmentHistories->add($appointmentHistory);
            $appointmentHistory->setVeterinarianID($this);
        }

        return $this;
    }

    public function removeAppointmentHistory(AppointmentHistory $appointmentHistory): static
    {
        if ($this->appointmentHistories->removeElement($appointmentHistory)) {
            // set the owning side to null (unless already changed)
            if ($appointmentHistory->getVeterinarianID() === $this) {
                $appointmentHistory->setVeterinarianID(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Schedules>
     */
    public function getSchedules(): Collection
    {
        return $this->schedules;
    }

    public function addSchedule(Schedules $schedule): static
    {
        if (!$this->schedules->contains($schedule)) {
            $this->schedules->add($schedule);
            $schedule->setVeterinarianID($this);
        }

        return $this;
    }

    public function removeSchedule(Schedules $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getVeterinarianID() === $this) {
                $schedule->setVeterinarianID(null);
            }
        }

        return $this;
    }
}
