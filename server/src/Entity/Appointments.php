<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Auth\User;
use App\Repository\AppointmentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AppointmentsRepository::class)]
#[ApiResource]
class Appointments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $reason = null;

    #[ORM\Column]
    private array $status = [];

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?Veterinarians $veterinarianID = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?User $userID = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    private ?Pets $petID = null;

    #[ORM\OneToMany(mappedBy: 'appointmentID', targetEntity: AppointmentServices::class)]
    private Collection $appointmentServices;

    #[ORM\OneToMany(mappedBy: 'appointmentID', targetEntity: Feedbacks::class)]
    private Collection $feedbacks;

    #[ORM\OneToMany(mappedBy: 'appointmentID', targetEntity: AppointmentHistory::class)]
    private Collection $appointmentHistories;

    public function __construct()
    {
        $this->appointmentServices = new ArrayCollection();
        $this->feedbacks = new ArrayCollection();
        $this->appointmentHistories = new ArrayCollection();
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

    public function getStatus(): array
    {
        return $this->status;
    }

    public function setStatus(array $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getVeterinarianID(): ?Veterinarians
    {
        return $this->veterinarianID;
    }

    public function setVeterinarianID(?Veterinarians $veterinarianID): static
    {
        $this->veterinarianID = $veterinarianID;

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

    public function getPetID(): ?Pets
    {
        return $this->petID;
    }

    public function setPetID(?Pets $petID): static
    {
        $this->petID = $petID;

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
            $appointmentService->setAppointmentID($this);
        }

        return $this;
    }

    public function removeAppointmentService(AppointmentServices $appointmentService): static
    {
        if ($this->appointmentServices->removeElement($appointmentService)) {
            // set the owning side to null (unless already changed)
            if ($appointmentService->getAppointmentID() === $this) {
                $appointmentService->setAppointmentID(null);
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
            $feedback->setAppointmentID($this);
        }

        return $this;
    }

    public function removeFeedback(Feedbacks $feedback): static
    {
        if ($this->feedbacks->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getAppointmentID() === $this) {
                $feedback->setAppointmentID(null);
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
            $appointmentHistory->setAppointmentID($this);
        }

        return $this;
    }

    public function removeAppointmentHistory(AppointmentHistory $appointmentHistory): static
    {
        if ($this->appointmentHistories->removeElement($appointmentHistory)) {
            // set the owning side to null (unless already changed)
            if ($appointmentHistory->getAppointmentID() === $this) {
                $appointmentHistory->setAppointmentID(null);
            }
        }

        return $this;
    }
}
