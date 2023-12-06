<?php

namespace App\Entity\Auth;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Appointments;
use App\Entity\Clinics;
use App\Entity\Notifications;
use App\Entity\Pets;
use App\Repository\AuthRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity()]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(normalizationContext: ['groups' => ['user:read', 'user:read:full']]),
        new Patch(denormalizationContext: ['groups' => ['user:write:update']]),
        new Get(uriTemplate: '/me', openapiContext: ['summary' => 'Get current user'], normalizationContext: ['groups' => ['user:read:full']], security: 'is_granted("ROLE_USER")',),

        // new Put(), // I don't use PUT, only PATCH
        // new Delete(), // Disable DELETE method, do soft delete instead
    ],

    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use Auth;

    #[Groups(['user:read'])]
    #[ApiFilter(DateFilter::class)]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full', 'pets:read:collection'])]
    #[ORM\Column(length: 180)]
    private ?string $firstname = null;

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full', 'pets:read:collection'])]
    #[ORM\Column(length: 180)]
    private ?string $lastname = null;

    #[ORM\OneToMany(mappedBy: 'userID', targetEntity: Pets::class)]
    private Collection $pets;

    #[ORM\OneToMany(mappedBy: 'userID', targetEntity: Appointments::class)]
    private Collection $appointments;

    #[ORM\OneToMany(mappedBy: 'userID', targetEntity: Notifications::class)]
    private Collection $notifications;

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $addresse = null;

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full'])]
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $phone = null;

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full'])]
    #[ORM\OneToOne(inversedBy: 'manager', cascade: ['persist', 'remove'])]
    private ?Clinics $clinic = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->pets = new ArrayCollection();
        $this->appointments = new ArrayCollection();
        $this->notifications = new ArrayCollection();
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): void
    {
        $this->createdAt = $createdAt;
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

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * @return Collection<int, Pets>
     */
    public function getPets(): Collection
    {
        return $this->pets;
    }

    public function addPet(Pets $pet): static
    {
        if (!$this->pets->contains($pet)) {
            $this->pets->add($pet);
            $pet->setUserID($this);
        }

        return $this;
    }

    public function removePet(Pets $pet): static
    {
        if ($this->pets->removeElement($pet)) {
            // set the owning side to null (unless already changed)
            if ($pet->getUserID() === $this) {
                $pet->setUserID(null);
            }
        }

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
            $appointment->setUserID($this);
        }

        return $this;
    }

    public function removeAppointment(Appointments $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getUserID() === $this) {
                $appointment->setUserID(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Notifications>
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notifications $notification): static
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications->add($notification);
            $notification->setUserID($this);
        }

        return $this;
    }

    public function removeNotification(Notifications $notification): static
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getUserID() === $this) {
                $notification->setUserID(null);
            }
        }

        return $this;
    }

    public function getAddresse(): ?string
    {
        return $this->addresse;
    }

    public function setAddresse(?string $addresse): static
    {
        $this->addresse = $addresse;

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