<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClinicsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClinicsRepository::class)]
#[ApiResource]
class Clinics
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 20)]
    private ?string $phone = null;

    #[ORM\OneToMany(mappedBy: 'clinicID', targetEntity: Veterinarians::class)]
    private Collection $veterinarians;

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
            $veterinarian->setClinicID($this);
        }

        return $this;
    }

    public function removeVeterinarian(Veterinarians $veterinarian): static
    {
        if ($this->veterinarians->removeElement($veterinarian)) {
            // set the owning side to null (unless already changed)
            if ($veterinarian->getClinicID() === $this) {
                $veterinarian->setClinicID(null);
            }
        }

        return $this;
    }
}
