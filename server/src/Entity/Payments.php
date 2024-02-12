<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Entity\Auth\User;
use App\Repository\PaymentsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PaymentsRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['payment:read:collection']]),
        new Get(normalizationContext: ['groups' => ['payment:read:item']]),
        new Post(normalizationContext: ['groups' => ['payment:write:item']]),
    ],
    normalizationContext: ['groups' => ['payment:read:collection']],
)]
class Payments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['payment:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $stripePaymentID = null;

    #[Groups(['payment:read:collection'])]
    #[ORM\Column]
    private ?float $amount = null;

    #[Groups(['payment:read:collection'])]
    #[ORM\Column(length: 50)]
    private ?string $status = null;

    #[Groups(['payment:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'payments')]
    private ?User $person = null;

    #[Groups(['payment:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'payments')]
    private ?Clinics $clinic = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStripePaymentID(): ?string
    {
        return $this->stripePaymentID;
    }

    public function setStripePaymentID(string $stripePaymentID): static
    {
        $this->stripePaymentID = $stripePaymentID;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getPerson(): ?User
    {
        return $this->person;
    }

    public function setPerson(?User $person): static
    {
        $this->person = $person;

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
