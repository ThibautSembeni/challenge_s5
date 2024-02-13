<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\GetVeterinarianServices;
use App\Entity\Auth\User;
use App\Repository\ServicesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ServicesRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/veterinarians/{uuid}/services',
            uriVariables: [
                'uuid' => new Link(toProperty: 'veterinarian', fromClass: Veterinarians::class)
                ],
            normalizationContext: ['groups' => ['services:read:collection']]
        ),
        new Post(
            normalizationContext: ['groups' => ['services:write:item']],
            security: 'is_granted("ROLE_VETERINARIAN")'
        ),
        new GetCollection(normalizationContext: ['groups' => ['services:read:collection']], name: 'get_services_for_veterinarian'),
        new Get(normalizationContext: ['groups' => ['services:read:collection']], name: 'get_one_services_for_veterinarian'),
        new Put(
            normalizationContext: ['groups' => ['services:write:item']],
            security: 'is_granted("UPDATE_SERVICE", object)',
        ),
        new Delete(
            security: 'is_granted("DELETE_SERVICE", object)',
        )
    ],
)]
class Services
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['services:read:collection', 'services:write:item', 'appointments:read:collections', 'appointments:read:item', 'schedules:read:collection'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[Groups(['services:read:collection', 'services:write:item'])]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $price = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: AppointmentServices::class)]
    private Collection $appointmentServices;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(referencedColumnName: 'uuid')]
    private ?Veterinarians $veterinarian = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Appointments::class)]
    private Collection $appointments;

    public function __construct()
    {
        $this->appointmentServices = new ArrayCollection();
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): static
    {
        $this->price = $price;

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
            $appointmentService->setService($this);
        }

        return $this;
    }

    public function removeAppointmentService(AppointmentServices $appointmentService): static
    {
        if ($this->appointmentServices->removeElement($appointmentService)) {
            // set the owning side to null (unless already changed)
            if ($appointmentService->getService() === $this) {
                $appointmentService->setService(null);
            }
        }

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
            $appointment->setService($this);
        }

        return $this;
    }

    public function removeAppointment(Appointments $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getService() === $this) {
                $appointment->setService(null);
            }
        }

        return $this;
    }
}
