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
use App\Controller\GenerateSchedulesController;
use App\Entity\Auth\User;
use App\Repository\VeterinariansRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Dto\GenerateSchedulesRequest;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: VeterinariansRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['veterinarians:read']]),
        new Post(normalizationContext: ['groups' => ['veterinarians:write:create']], securityPostDenormalize: "is_granted('CREATE_VETERINARIAN', object)"),
        new Get(normalizationContext: ['groups' => ['veterinarians:read']]),
        new Put(),
        new Delete(security: "is_granted('DELETE_VETERINARIAN', object)"),
        new Patch(),
        new Post(
            uriTemplate: '/veterinarians/{uuid}/generate-schedules',
            controller: GenerateSchedulesController::class,
//            inputFormats: ['json' => ['application/ld+json']],
//            outputFormats: ['json' => ['application/ld+json']]

        )
    ],
    normalizationContext: ['groups' => ['veterinarians:read']],
    paginationPartial: false,
)]
class Veterinarians
{
//    #[ORM\Id]
//    #[ORM\GeneratedValue]
//    #[ORM\Column]
//    #[ApiProperty(identifier: false)]
//    private ?int $id = null;

    #[Groups(['veterinarians:read', 'clinics:read', 'appointments:read:item'])]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ApiProperty(identifier: true)]
    #[ORM\Id]
    private Uuid $uuid;

    #[Groups(['veterinarians:read', 'veterinarians:write:create', 'clinics:read', 'clinics:read:collection', 'appointments:read:collections', 'appointments:read:item'])]
    #[ORM\Column(length: 100)]
    private ?string $lastname = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create', 'clinics:read', 'clinics:read:collection', 'appointments:read:collections', 'appointments:read:item'])]
    #[ORM\Column(length: 100)]
    private ?string $firstname = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create'])]
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $phone = null;

    #[Groups(['veterinarians:read', 'veterinarians:write:create', 'clinics:read', 'clinics:read:collection', 'appointments:read:item'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $specialties = null;

    #[Groups(['veterinarians:read', 'appointments:read:item'])]
    #[ORM\ManyToOne(inversedBy: 'veterinarians')]
    #[ORM\JoinColumn(referencedColumnName: 'uuid')]
    private ?Clinics $clinic = null;

    #[ORM\OneToMany(mappedBy: 'veterinarian', targetEntity: Appointments::class)]
    private Collection $appointments;

    #[ORM\OneToMany(mappedBy: 'veterinarian', targetEntity: AppointmentHistory::class)]
    private Collection $appointmentHistories;

    #[ORM\OneToMany(mappedBy: 'veterinarian', targetEntity: Schedules::class)]
    private Collection $schedules;

    #[ORM\OneToMany(mappedBy: 'veterinarian', targetEntity: Services::class)]
    private Collection $services;

    #[ORM\OneToOne(inversedBy: 'veterinarian', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
        $this->appointmentHistories = new ArrayCollection();
        $this->schedules = new ArrayCollection();
        $this->uuid = Uuid::v4();
        $this->services = new ArrayCollection();
    }

//    public function getId(): ?int
//    {
//        return $this->id;
//    }

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
            $appointment->setVeterinarian($this);
        }

        return $this;
    }

    public function removeAppointment(Appointments $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getVeterinarian() === $this) {
                $appointment->setVeterinarian(null);
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
            $appointmentHistory->setVeterinarian($this);
        }

        return $this;
    }

    public function removeAppointmentHistory(AppointmentHistory $appointmentHistory): static
    {
        if ($this->appointmentHistories->removeElement($appointmentHistory)) {
            // set the owning side to null (unless already changed)
            if ($appointmentHistory->getVeterinarian() === $this) {
                $appointmentHistory->setVeterinarian(null);
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
            $schedule->setVeterinarian($this);
        }

        return $this;
    }

    public function removeSchedule(Schedules $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getVeterinarian() === $this) {
                $schedule->setVeterinarian(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Services>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Services $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setVeterinarian($this);
        }

        return $this;
    }

    public function removeService(Services $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getVeterinarian() === $this) {
                $service->setVeterinarian(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
