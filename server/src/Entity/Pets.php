<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Auth\User;
use App\Repository\PetsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation\SoftDeleteable;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: PetsRepository::class)]
#[SoftDeleteable(fieldName: "deletedAt", timeAware: false, hardDelete: false)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['pets:read:collection']]),
        new Get(normalizationContext: ['groups' => ['pets:read:item']]),
        new Post(normalizationContext: ['groups' => ['pets:write:item']]),
        new Patch(normalizationContext: ['groups' => ['pets:read:item']], denormalizationContext: ['groups' => ['pets:update:item']]),
        new Delete()
    ],
    normalizationContext: ['groups' => ['pets:read:collection']],
)]
class Pets
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['pets:read:collection', 'pets:read:item', 'users:read:collection'])]
    private Uuid $uuid;

    #[Groups(['pets:read:collection', 'pets:read:item', 'pets:write:item', 'pets:update:item', 'appointments:read:collections', 'appointments:read:item', 'users:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['pets:read:collection', 'pets:read:item', 'pets:write:item', 'pets:update:item'])]
    #[ORM\Column(length: 255)]
    private ?string $species = null;

    #[Groups(['pets:read:collection', 'pets:read:item', 'pets:write:item', 'pets:update:item'])]
    #[ORM\Column(length: 255)]
    private ?string $breed = null;

    #[Groups(['pets:read:collection', 'pets:read:item', 'pets:write:item', 'pets:update:item'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $birthdate = null;

    #[Groups(['pets:read:item', 'pets:write:item', 'pets:update:item'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $medicalHistory = null;

    #[Groups(['pets:read:collection'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTime $deletedAt = null;

    #[Groups(['pets:read:collection', 'pets:read:item'])]
    #[ORM\ManyToOne(inversedBy: 'pets')]
    private ?User $userID = null;

    #[ORM\OneToMany(mappedBy: 'pet', targetEntity: Appointments::class)]
    private Collection $appointments;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
        $this->uuid = Uuid::v4();
    }

//    public function getId(): ?int
//    {
//        return $this->id;
//    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSpecies(): ?string
    {
        return $this->species;
    }

    public function setSpecies(string $species): static
    {
        $this->species = $species;

        return $this;
    }

    public function getBreed(): ?string
    {
        return $this->breed;
    }

    public function setBreed(string $breed): static
    {
        $this->breed = $breed;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): static
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getMedicalHistory(): ?string
    {
        return $this->medicalHistory;
    }

    public function setMedicalHistory(?string $medicalHistory): static
    {
        $this->medicalHistory = $medicalHistory;

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
            $appointment->setPet($this);
        }

        return $this;
    }

    public function removeAppointment(Appointments $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getPet() === $this) {
                $appointment->setPet(null);
            }
        }

        return $this;
    }

    /**
     * @return \DateTime|null
     */
    public function getDeletedAt(): ?\DateTime
    {
        return $this->deletedAt;
    }

    /**
     * @param \DateTime|null $deletedAt
     * @return self
     */
    public function setDeletedAt(?\DateTime $deletedAt): self
    {
        $this->deletedAt = $deletedAt;
        return $this;
    }

    public function isDeleted(): bool
    {
        return $this->deletedAt !== null;
    }

    public function delete(): self
    {
        $this->deletedAt = new \DateTime();
        return $this;
    }
}
