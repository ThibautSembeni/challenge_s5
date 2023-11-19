<?php

namespace App\Entity\Auth;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\AuthRepository;
use DateTimeImmutable;
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

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full'])]
    #[ORM\Column(length: 180)]
    private ?string $firstname = null;

    #[Groups(['user:read', 'user:write', 'user:write:update', 'user:read:full'])]
    #[ORM\Column(length: 180)]
    private ?string $lastname = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
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


}
