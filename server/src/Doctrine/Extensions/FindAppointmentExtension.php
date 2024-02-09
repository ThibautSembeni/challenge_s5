<?php

namespace App\Doctrine\Extensions;



use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Appointments;
use App\Entity\Pets;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use Symfony\Bundle\SecurityBundle\Security;

final class FindAppointmentExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if ($operation->getName() !== 'get_appointments_history') {
            $this->addWhere($queryBuilder, $resourceClass);
        } else if (Appointments::class === $resourceClass && $operation->getName() === 'get_appointments_history') {
            $user = $this->security->getUser();

            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.userID = :userID', $rootAlias));
            $queryBuilder->setParameter('userID', $user->getId());
            $queryBuilder->andWhere(sprintf('%s.status = :status', $rootAlias));
            $queryBuilder->setParameter('status', 'completed');
            $queryBuilder->orderBy(sprintf('%s.date', $rootAlias), 'DESC');
        }
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        if ($operation->getName() === 'getOneAppointment') {
            return;
        }

        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        if (Appointments::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN') || null === $user = $this->security->getUser()) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.userID = :userID', $rootAlias));
        $queryBuilder->setParameter('userID', $user->getId());
        $queryBuilder->andWhere(sprintf('%s.status = :status', $rootAlias));
        $queryBuilder->setParameter('status', 'scheduled');
        $queryBuilder->orderBy(sprintf('%s.date', $rootAlias), 'ASC');
    }
}
