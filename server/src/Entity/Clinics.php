<?php

namespace App\Entity;


use ApiPlatform\Doctrine\Odm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Odm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Auth\User;
use App\Filters\ClinicByManagerFilter;
use App\Filters\CustomSearchFilter;
use ApiPlatform\Metadata\ApiProperty;
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
use Gedmo\Mapping\Annotation\SoftDeleteable;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ClinicsRepository::class)]
#[SoftDeleteable(fieldName: "deletedAt", timeAware: false, hardDelete: false)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['clinics:read', 'clinics:read:collection']]),
        new Post(normalizationContext: ['groups' => ['clinics:write:create']]),
        new Get(normalizationContext: ['groups' => ['clinics:read']]),
        new Delete(security: "is_granted('DELETE_CLINIC', object)"),
        new Patch(securityPostDenormalize: "is_granted('EDIT_CLINIC', object)")
    ],
    normalizationContext: ['groups' => ['clinics:read:collection']],
    paginationPartial: false,
)]
#[ApiFilter(ClinicByManagerFilter::class)]
class Clinics
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['clinics:read:collection'])]
    #[ApiProperty(identifier: false)]
    private ?int $id = null;

    #[Groups(['veterinarians:read', 'user:read:full', 'clinics:read:collection', 'clinics:write:create', 'clinics:read', 'appointments:read:item', 'payment:read:collection'])]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ApiProperty(identifier: true)]
    private Uuid $uuid;

    #[Groups(['clinics:read:collection', 'clinics:write:create', 'clinics:read', 'veterinarians:read', 'appointments:read:item', 'payment:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['clinics:read:collection', 'clinics:write:create', 'clinics:read', 'veterinarians:read', 'appointments:read:item'])]
    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['clinics:write:create', 'clinics:read', 'appointments:read:item'])]
    #[ORM\Column(length: 20)]
    private ?string $phone = null;

    #[Groups(['clinics:read:collection', 'clinics:write:create', 'clinics:read'])]
    #[ORM\OneToMany(mappedBy: 'clinic', targetEntity: Veterinarians::class)]
    private Collection $veterinarians;

    #[Groups(['clinics:read:collection', 'veterinarians:read', 'clinics:read'])]
    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[Groups(['clinics:read:collection', 'veterinarians:read', 'clinics:read'])]
    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ApiFilter(CustomSearchFilter::class)]
    #[Groups(['clinics:read:collection', 'veterinarians:read', 'clinics:read', 'appointments:read:item'])]
    #[ORM\Column(length: 50)]
    private ?string $city = null;

    #[Groups(['clinics:read:collection', 'veterinarians:read', 'clinics:read', 'appointments:read:item'])]
    #[ORM\Column(length: 15)]
    private ?string $postalCode = null;

    #[Groups(['clinics:write:create', 'clinics:read', 'veterinarians:read', 'clinics:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\OneToMany(mappedBy: 'clinic', targetEntity: ClinicSchedules::class)]
    private Collection $clinicSchedules;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\OneToMany(mappedBy: 'clinic', targetEntity: ClinicComplementaryInformation::class)]
    private Collection $clinicComplementaryInformation;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\ManyToOne(inversedBy: 'clinic')]
    private ?User $manager = null;

    #[Groups(['clinics:write:create', 'clinics:read'])]
    #[ORM\Column(nullable: true)]
    private ?bool $isActif = null;

    #[Groups(['clinics:read'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTime $deletedAt = null;

    #[ORM\OneToMany(mappedBy: 'clinic', targetEntity: Payments::class)]
    private Collection $payments;

    public function __construct()
    {
        $this->veterinarians = new ArrayCollection();
        $this->uuid = Uuid::v4();
        $this->clinicSchedules = new ArrayCollection();
        $this->clinicComplementaryInformation = new ArrayCollection();
        $this->payments = new ArrayCollection();
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
            $clinicSchedule->setClinic($this);
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
            if ($clinicSchedule->getClinic() === $this) {
                $clinicSchedule->setClinic(null);
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
            $clinicComplementaryInformation->setClinic($this);
        }

        return $this;
    }

    public function removeClinicComplementaryInformation(ClinicComplementaryInformation $clinicComplementaryInformation): static
    {
        if ($this->clinicComplementaryInformation->removeElement($clinicComplementaryInformation)) {
            // set the owning side to null (unless already changed)
            if ($clinicComplementaryInformation->getClinic() === $this) {
                $clinicComplementaryInformation->setClinic(null);
            }
        }
        return $this;
    }

    public function getManager(): ?User
    {
        return $this->manager;
    }

    public function setManager(?User $manager): static
    {
        $this->manager = $manager;

        return $this;
    }

    public function isIsActif(): ?bool
    {
        return $this->isActif;
    }

    public function setIsActif(?bool $isActif): static
    {
        $this->isActif = $isActif;

        return $this;
    }

    /**
     * @return Collection<int, Payments>
     */
    public function getPayments(): Collection
    {
        return $this->payments;
    }

    public function addPayment(Payments $payment): static
    {
        if (!$this->payments->contains($payment)) {
            $this->payments->add($payment);
            $payment->setClinic($this);
        }

        return $this;
    }

    public function removePayment(Payments $payment): static
    {
        if ($this->payments->removeElement($payment)) {
            // set the owning side to null (unless already changed)
            if ($payment->getClinic() === $this) {
                $payment->setClinic(null);
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