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
        new GetCollection(normalizationContext: ['groups' => ['clinics:read']]),
        new Post(normalizationContext: ['groups' => ['clinics:write:create']], security: "is_granted('PUBLIC_ACCESS')"),
        new Get(normalizationContext: ['groups' => ['clinics:read']]),
        new Put(),
        new Delete(),
        new Patch()
    ],
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
    private Uuid $uuid;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(length: 20)]
    private ?string $phone = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\OneToMany(mappedBy: 'clinic', targetEntity: Veterinarians::class)]
    private Collection $veterinarians;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\OneToMany(mappedBy: 'clinic_id', targetEntity: ClinicSchedules::class)]
    private Collection $clinicSchedules;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\OneToMany(mappedBy: 'clinic_id', targetEntity: ClinicComplementaryInformation::class)]
    private Collection $clinicComplementaryInformation;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

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
}
