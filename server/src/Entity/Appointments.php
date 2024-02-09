<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
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
        new Get(normalizationContext: ['groups' => ['appointments:read:item']], name: 'getOneAppointment'),
        new Get(
            uriTemplate: '/appointments/{uuid}/ics',
            controller: GenerateIcsFileFromAppointmentController::class,
            security: 'is_granted("ROLE_USER")',
            securityMessage: 'Only authenticated users can access this resource.',
            name: 'generate_ics_file_from_appointment',
        ),
        new Post(
            normalizationContext: ['groups' => ['appointments:write:create']],
            denormalizationContext: ['groups' => ['appointments:write:create']]
        )
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

    #[Groups(['appointments:read:item', 'appointments:read:collections', 'appointments:write:create'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[Groups(['appointments:read:item', 'appointments:read:collections'])]
    #[ORM\Column]
    private ?string $status = AppointmentsStatusEnum::STATUS_SCHEDULED->value;

    #[Groups(['appointments:read:item', 'appointments:read:collections', 'appointments:write:create'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(referencedColumnName: 'uuid')]
    private ?Veterinarians $veterinarian = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?User $userID = null;

    #[Groups(['appointments:read:item', 'appointments:read:collections', 'appointments:write:create'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(referencedColumnName: 'uuid')]
    private ?Pets $pet = null;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: AppointmentServices::class)]
    private Collection $appointmentServices;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: Feedbacks::class)]
    private Collection $feedbacks;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: AppointmentHistory::class)]
    private Collection $appointmentHistories;

    #[Groups(['appointments:write:create'])]
    #[ORM\OneToOne(inversedBy: 'appointments', cascade: ['persist', 'remove'])]
    private ?Schedules $schedules = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?Services $service = null;

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

    public function getSchedules(): ?Schedules
    {
        return $this->schedules;
    }

    public function setSchedules(?Schedules $schedules): static
    {
        $this->schedules = $schedules;

        return $this;
    }

    public function getService(): ?Services
    {
        return $this->service;
    }

    public function setService(?Services $service): static
    {
        $this->service = $service;

        return $this;
    }
}
