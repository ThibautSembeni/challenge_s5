<?php

namespace App\Entity;

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

#[ORM\Entity(repositoryClass: VeterinariansRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(normalizationContext: ['groups' => ['veterinarians:write:create']], security: "is_granted('PUBLIC_ACCESS')"),
        new Get(),
        new Put(),
        new Delete(),
        new Patch()
    ],
    normalizationContext: ['groups' => ['veterinarians:read']],
    paginationPartial: false,
)]
class Veterinarians
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['veterinarians:write:create', 'veterinarians:read'])]
    #[ORM\Column(length: 100)]
    private ?string $lastname = null;

    #[Groups(['veterinarians:write:create', 'veterinarians:read'])]
    #[ORM\Column(length: 100)]
    private ?string $firstname = null;

    #[Groups(['veterinarians:write:create', 'veterinarians:read'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;


    #[Groups(['veterinarians:write:create', 'veterinarians:read'])]
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $phone = null;

    #[Groups(['veterinarians:write:create', 'veterinarians:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $specialties = null;

    #[Groups(['veterinarians:read'])]
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
    }

    public function getId(): ?int
    {
        return $this->id;
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
