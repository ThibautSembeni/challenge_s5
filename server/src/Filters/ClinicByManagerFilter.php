<?php

namespace App\Filters;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;

final class ClinicByManagerFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if ($property !== 'manager') {
            return;
        }

        $parameterName = $queryNameGenerator->generateParameterName($property);
        $queryBuilder
            ->join('o.manager', 'm')
            ->andWhere(sprintf('m.uuid = :%s', $parameterName))
            ->andWhere('o.isActif = :isActif')
            ->setParameter($parameterName, $value)
            ->setParameter('isActif', true);
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'manager' => [
                'property' => 'manager',
                'type' => 'string',
                'required' => false,
                'description' => 'Filter clinics by manager UUID (isActif = true)',
            ],
        ];
    }
}

