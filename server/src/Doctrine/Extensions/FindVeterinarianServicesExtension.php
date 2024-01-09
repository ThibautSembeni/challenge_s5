<?php

namespace App\Doctrine\Extensions;



use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Services;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use Symfony\Bundle\SecurityBundle\Security;

final class FindVeterinarianServicesExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(private readonly Security $security)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {

//        echo var_dump($context); die();
        if (Services::class === $resourceClass && $operation->getName() === 'get_services_for_user') {
            return;
        }
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
//        echo 'item ' . $operation->getName(); die();
        if ($operation->getName() === 'get_services_for_user') {
            echo $queryBuilder; die();
        }
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        if (Services::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN') || null === $user = $this->security->getUser()) {
            return;
        }

//        $rootAlias = $queryBuilder->getRootAliases()[0];
//        $queryBuilder->andWhere(sprintf('%s.userID = :userID', $rootAlias));
//        $queryBuilder->setParameter('userID', $user->getId());
    }
}
