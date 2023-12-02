<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Filters\CustomSearchFilter;
use App\Repository\ClinicsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClinicsRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['clinics:read:collection']],
)]
class Clinics
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['clinics:read:collection', 'veterinarians:read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['clinics:read:collection', 'veterinarians:read'])]
    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 20)]
    private ?string $phone = null;

    #[Groups(['clinics:read:collection'])]
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

    public function __construct()
    {
        $this->veterinarians = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): static
    {
        $this->longitude = $longitude;

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

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): static
    {
        $this->postalCode = $postalCode;

        return $this;
    }
}
