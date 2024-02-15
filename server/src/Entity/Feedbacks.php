<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use App\Controller\Back\Clinics\FeedbacksController;
use App\Controller\Back\Clinics\VeterinariansAndAppointmentsController;
use App\Repository\FeedbacksRepository;
use App\Entity\Appointments;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Traits\TimestampableTrait;

#[ORM\Entity(repositoryClass: FeedbacksRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['feedbacks:read']],
    denormalizationContext: ['groups' => ['feedbacks:write']],
    validationContext: ['groups' => ['feedbacks:write:item', 'feedbacks:write:modify']],
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['feedbacks:read']]),
        new GetCollection(
            uriTemplate: '/feedbacks/veterinarians/',
            controller: FeedbacksController::class,
            name: 'get_feedbacks_veterinarians',
            security: "is_granted('ROLE_VETERINARIAN')",
            securityMessage: "You are not allowed to access this resource!",
        ),
        new Post(denormalizationContext: ['groups' => ['feedbacks:write']], normalizationContext: ['groups' => ['feedbacks:read']], validationContext: ['groups' => ['feedbacks:write:item']]),
        new Get(normalizationContext: ['groups' => ['feedbacks:read']]),
        new Patch(denormalizationContext: ['groups' => ['feedbacks:update']], normalizationContext: ['groups' => ['feedbacks:read']], validationContext: ['groups' => ['feedbacks:write:modify']]),
        new Delete(),
    ]
)]
class Feedbacks
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['feedbacks:read'])]
    private ?int $id = null;

    #[Assert\Range(min: 1, max: 5, groups: ['feedbacks:write:item'])]
    #[Assert\Range(min: 1, max: 5, groups: ['feedbacks:write:modify'])]
    #[Groups(['feedbacks:read', 'feedbacks:write', 'feedbacks:update', 'appointments:read:item'])]
    #[ORM\Column]
    private ?int $rating = null;

    #[Assert\Length(max: 400, groups: ['feedbacks:write:item'])]
    #[Assert\Length(max: 400, groups: ['feedbacks:write:modify'])]
    #[Groups(['feedbacks:read', 'feedbacks:write', 'feedbacks:update', 'appointments:read:item'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment = null;

    #[Groups(['feedbacks:write', 'feedbacks:read'])]
    #[ORM\ManyToOne(inversedBy: 'feedbacks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Appointments $appointment = null;

    #[Groups(['feedbacks:read', 'feedbacks:write', 'feedbacks:update', 'appointments:read:item'])]
    #[ORM\Column]
    private ?bool $verify = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getDatetime(): ?\DateTimeInterface
    {
        return $this->datetime;
    }

    public function setDatetime(\DateTimeInterface $datetime): static
    {
        $this->datetime = $datetime;

        return $this;
    }

    public function getAppointment(): ?Appointments
    {
        return $this->appointment;
    }

    public function setAppointment(?Appointments $appointment): static
    {
        $this->appointment = $appointment;

        return $this;
    }

    public function isVerify(): ?bool
    {
        return $this->verify;
    }

    public function setVerify(bool $verify): static
    {
        $this->verify = $verify;

        return $this;
    }
}
