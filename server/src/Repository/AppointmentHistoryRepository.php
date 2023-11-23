<?php

namespace App\Repository;

use App\Entity\AppointmentHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AppointmentHistory>
 *
 * @method AppointmentHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method AppointmentHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method AppointmentHistory[]    findAll()
 * @method AppointmentHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AppointmentHistory::class);
    }

//    /**
//     * @return AppointmentHistory[] Returns an array of AppointmentHistory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AppointmentHistory
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
