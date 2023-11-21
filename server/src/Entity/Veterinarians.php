<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\VeterinariansRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VeterinariansRepository::class)]
#[ApiResource]
class Veterinarians
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $lastname = null;

    #[ORM\Column(length: 100)]
    private ?string $fistname = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $specialties = null;

    #[ORM\ManyToOne(inversedBy: 'veterinarians')]
    private ?Clinics $clinicID = null;

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

    public function getFistname(): ?string
    {
        return $this->fistname;
    }

    public function setFistname(string $fistname): static
    {
        $this->fistname = $fistname;

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

    public function getClinicID(): ?Clinics
    {
        return $this->clinicID;
    }

    public function setClinicID(?Clinics $clinicID): static
    {
        $this->clinicID = $clinicID;

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
