<?php

namespace App\Doctrine\Extensions;



use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Schedules;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use Symfony\Bundle\SecurityBundle\Security;

final class SchedulesExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct()
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if ($operation->getName() === 'get_free_schedules_by_veterinarian') {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->leftJoin(sprintf('%s.appointments', $rootAlias), 'appointments');
            $queryBuilder->andWhere(sprintf('appointments IS NULL'));
        }
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
    }

}
