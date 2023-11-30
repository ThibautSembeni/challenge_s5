<?php

namespace App\Repository;

use App\Entity\ClinicSchedules;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ClinicSchedules>
 *
 * @method ClinicSchedules|null find($id, $lockMode = null, $lockVersion = null)
 * @method ClinicSchedules|null findOneBy(array $criteria, array $orderBy = null)
 * @method ClinicSchedules[]    findAll()
 * @method ClinicSchedules[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClinicSchedulesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ClinicSchedules::class);
    }

//    /**
//     * @return ClinicSchedules[] Returns an array of ClinicSchedules objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ClinicSchedules
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
