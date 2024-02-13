<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use App\Controller\GenerateIcsFileFromAppointmentController;
use App\Entity\Auth\User;
use App\Enum\AppointmentsStatusEnum;
use App\Repository\AppointmentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\String_;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: AppointmentsRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['appointments:read:collections']]),
        new GetCollection(uriTemplate: '/appointments/history', normalizationContext: ['groups' => ['appointments:read:collections']], name: 'get_appointments_history'),
        new GetCollection(uriTemplate: '/appointments/scheduled', normalizationContext: ['groups' => ['appointments:read:collections']], name: 'get_scheduled_appointments', security: 'is_granted("ROLE_MANAGER")'),
        new Get(normalizationContext: ['groups' => ['appointments:read:item']], name: 'getOneAppointment'),
        new Get(
            uriTemplate: '/appointments/{uuid}/ics',
            controller: GenerateIcsFileFromAppointmentController::class,
            security: 'is_granted("ROLE_USER")',
            securityMessage: 'Only authenticated users can access this resource.',
            name: 'generate_ics_file_from_appointment',
        ),
        
    ],
)]
class Appointments
{
    #[Groups(['appointments:read:item', 'appointments:read:collections'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier: false)]
    private ?int $id = null;

    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['appointments:read:collections', 'appointments:read:item'])]
    private Uuid $uuid;

    #[Groups(['appointments:read:item', 'appointments:read:collections'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[Groups(['appointments:read:item', 'appointments:read:collections'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $reason = null;

    #[Groups(['appointments:read:item', 'appointments:read:collections', 'clinics:read:collection'])]
    #[ORM\Column]
    private ?string $status = null;

    #[Groups(['appointments:read:item', 'appointments:read:collections', 'feedbacks:read'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?Veterinarians $veterinarian = null;

    #[Groups(['feedbacks:read', 'appointments:read:item'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?User $userID = null;

   #[Groups(['appointments:read:item', 'appointments:read:collections'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?Pets $pet = null;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: AppointmentServices::class)]
    private Collection $appointmentServices;

    #[Groups(['appointments:read:item'])]
    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: Feedbacks::class)]
    private Collection $feedbacks;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: AppointmentHistory::class)]
    private Collection $appointmentHistories;

    public function __construct()
    {
        $this->appointmentServices = new ArrayCollection();
        $this->feedbacks = new ArrayCollection();
        $this->appointmentHistories = new ArrayCollection();
        $this->uuid = Uuid::v4();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(?string $reason): static
    {
        $this->reason = $reason;

        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    #[Groups(['appointments:write'])]
    #[ApiProperty(example: AppointmentsStatusEnum::STATUS_SCHEDULED->value)]
    public function setStatus(string $status): static
    {
        $enum = AppointmentsStatusEnum::from($status);
        $this->status = $enum->value;

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

    public function getUserID(): ?User
    {
        return $this->userID;
    }

    public function setUserID(?User $userID): static
    {
        $this->userID = $userID;

        return $this;
    }

    public function getPet(): ?Pets
    {
        return $this->pet;
    }

    public function setPet(?Pets $pet): static
    {
        $this->pet = $pet;

        return $this;
    }

    /**
     * @return Collection<int, AppointmentServices>
     */
    public function getAppointmentServices(): Collection
    {
        return $this->appointmentServices;
    }

    public function addAppointmentService(AppointmentServices $appointmentService): static
    {
        if (!$this->appointmentServices->contains($appointmentService)) {
            $this->appointmentServices->add($appointmentService);
            $appointmentService->setAppointment($this);
        }

        return $this;
    }

    public function removeAppointmentService(AppointmentServices $appointmentService): static
    {
        if ($this->appointmentServices->removeElement($appointmentService)) {
            // set the owning side to null (unless already changed)
            if ($appointmentService->getAppointment() === $this) {
                $appointmentService->setAppointment(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Feedbacks>
     */
    public function getFeedbacks(): Collection
    {
        return $this->feedbacks;
    }

    public function addFeedback(Feedbacks $feedback): static
    {
        if (!$this->feedbacks->contains($feedback)) {
            $this->feedbacks->add($feedback);
            $feedback->setAppointment($this);
        }

        return $this;
    }

    public function removeFeedback(Feedbacks $feedback): static
    {
        if ($this->feedbacks->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getAppointment() === $this) {
                $feedback->setAppointment(null);
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
            $appointmentHistory->setAppointment($this);
        }

        return $this;
    }

    public function removeAppointmentHistory(AppointmentHistory $appointmentHistory): static
    {
        if ($this->appointmentHistories->removeElement($appointmentHistory)) {
            // set the owning side to null (unless already changed)
            if ($appointmentHistory->getAppointment() === $this) {
                $appointmentHistory->setAppointment(null);
            }
        }

        return $this;
    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }
}
