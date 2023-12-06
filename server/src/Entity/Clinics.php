<?php

namespace App\Entity;


use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Filters\CustomSearchFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Auth\User;
use App\Repository\ClinicsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ClinicsRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['clinics:read', 'clinics:read:collection']]),
        new Post(normalizationContext: ['groups' => ['clinics:write:create']], security: "is_granted('EDIT', object)"),
        new Get(normalizationContext: ['groups' => ['clinics:read']]),
        new Put(security: "is_granted('EDIT', object)"),
        new Delete(security: "is_granted('EDIT', object)"),
        new Patch(security: "is_granted('EDIT', object)")
    ],
    normalizationContext: ['groups' => ['clinics:read:collection']],
    paginationPartial: false,
)]
class Clinics
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier: false)]
    private ?int $id = null;

    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['user:read:full'])]
    private Uuid $uuid;

    #[Groups(['clinics:read:collection', 'clinics:write:create', 'clinics:read', 'veterinarians:read', 'user:read:full'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['clinics:read:collection', 'clinics:write:create', 'clinics:read'])]
    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[Groups(['clinics:write:create', 'clinics:read', 'user:read:full'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['clinics:write:create', 'clinics:read', 'user:read:full'])]
    #[ORM\Column(length: 20)]
    private ?string $phone = null;

    #[Groups(['clinics:read:collection', 'clinics:write:create', 'clinics:read', 'user:read:full'])]
    #[ORM\OneToMany(mappedBy: 'clinic', targetEntity: Veterinarians::class)]
    private Collection $veterinarians;

    #[Groups(['clinics:read:collection', 'veterinarians:read'])]
    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[Groups(['clinics:read:collection', 'veterinarians:read'])]
    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ApiFilter(CustomSearchFilter::class)]
    #[Groups(['clinics:read:collection', 'veterinarians:read'])]
    #[ORM\Column(length: 50)]
    private ?string $city = null;

    #[Groups(['clinics:read:collection', 'veterinarians:read'])]
    #[ORM\Column(length: 15)]
    private ?string $postalCode = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups(['clinics:write:create', 'clinics:read', 'user:read:full'])]
    #[ORM\OneToMany(mappedBy: 'clinic_id', targetEntity: ClinicSchedules::class)]
    private Collection $clinicSchedules;

    #[Groups(['clinics:write:create', 'clinics:read', 'user:read:full'])]
    #[ORM\OneToMany(mappedBy: 'clinic_id', targetEntity: ClinicComplementaryInformation::class)]
    private Collection $clinicComplementaryInformation;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\OneToOne(mappedBy: 'clinic_id', cascade: ['persist', 'remove'])]
    private ?User $user_id = null;

    public function __construct()
    {
        $this->veterinarians = new ArrayCollection();
        $this->uuid = Uuid::v4();
        $this->clinicSchedules = new ArrayCollection();
        $this->clinicComplementaryInformation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

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

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection<int, Veterinarians>
     */
    public function getVeterinarians(): Collection
    {
        return $this->veterinarians;
    }

    public function addVeterinarian(Veterinarians $veterinarian): static
    {
        if (!$this->veterinarians->contains($veterinarian)) {
            $this->veterinarians->add($veterinarian);
            $veterinarian->setClinic($this);
        }

        return $this;
    }

    public function removeVeterinarian(Veterinarians $veterinarian): static
    {
        if ($this->veterinarians->removeElement($veterinarian)) {
            // set the owning side to null (unless already changed)
            if ($veterinarian->getClinic() === $this) {
                $veterinarian->setClinic(null);
            }
        }

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): static
    {
        $this->latitude = $latitude;
        return $this;
    }
    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): static
    {
        $this->longitude = $longitude;
        return $this;
    }

    /**
     * @return Collection<int, ClinicSchedules>
     */
    #[Groups(['clinics:read'])]
    public function getClinicSchedules(): Collection
    {
        return $this->clinicSchedules;
    }

    public function addClinicSchedule(ClinicSchedules $clinicSchedule): static
    {
        if (!$this->clinicSchedules->contains($clinicSchedule)) {
            $this->clinicSchedules->add($clinicSchedule);
            $clinicSchedule->setClinicId($this);
        }

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;
        return $this;
    }
    public function removeClinicSchedule(ClinicSchedules $clinicSchedule): static
    {
        if ($this->clinicSchedules->removeElement($clinicSchedule)) {
            // set the owning side to null (unless already changed)
            if ($clinicSchedule->getClinicId() === $this) {
                $clinicSchedule->setClinicId(null);
            }
        }

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): static
    {
        $this->postalCode = $postalCode;
        return $this;
    }

    /**
     * @return Collection<int, ClinicComplementaryInformation>
     */
    public function getClinicComplementaryInformation(): Collection
    {
        return $this->clinicComplementaryInformation;
    }

    public function addClinicComplementaryInformation(ClinicComplementaryInformation $clinicComplementaryInformation): static
    {
        if (!$this->clinicComplementaryInformation->contains($clinicComplementaryInformation)) {
            $this->clinicComplementaryInformation->add($clinicComplementaryInformation);
            $clinicComplementaryInformation->setClinicId($this);
        }

        return $this;
    }

    public function removeClinicComplementaryInformation(ClinicComplementaryInformation $clinicComplementaryInformation): static
    {
        if ($this->clinicComplementaryInformation->removeElement($clinicComplementaryInformation)) {
            // set the owning side to null (unless already changed)
            if ($clinicComplementaryInformation->getClinicId() === $this) {
                $clinicComplementaryInformation->setClinicId(null);
            }
        }
        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        // unset the owning side of the relation if necessary
        if ($user_id === null && $this->user_id !== null) {
            $this->user_id->setClinicId(null);
        }

        // set the owning side of the relation if necessary
        if ($user_id !== null && $user_id->getClinicId() !== $this) {
            $user_id->setClinicId($this);
        }

        $this->user_id = $user_id;

        return $this;
    }
}
