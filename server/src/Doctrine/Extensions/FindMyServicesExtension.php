<?php

namespace App\Doctrine\Extensions;



use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Services;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use Symfony\Bundle\SecurityBundle\Security;

final class FindMyServicesExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if (Services::class === $resourceClass && $operation->getName() === 'get_services_for_veterinarian') {
            $user = $this->security->getUser();

            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.veterinarian = :veterinarian', $rootAlias));
            $queryBuilder->setParameter('veterinarian', $user->getVeterinarian());
        }
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        if (Services::class === $resourceClass && $operation->getName() === 'get_one_services_for_veterinarian') {
            $user = $this->security->getUser();

            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.veterinarian = :veterinarian', $rootAlias));
            $queryBuilder->setParameter('veterinarian', $user->getVeterinarian());
        }
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        if (Services::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN') || null === $user = $this->security->getUser()) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.userID = :userID', $rootAlias));
        $queryBuilder->setParameter('userID', $user->getId());
    }
}
