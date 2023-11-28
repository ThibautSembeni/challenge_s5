<?php

namespace App\Repository;

use App\Entity\ClinicComplementaryInformation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ClinicComplementaryInformation>
 *
 * @method ClinicComplementaryInformation|null find($id, $lockMode = null, $lockVersion = null)
 * @method ClinicComplementaryInformation|null findOneBy(array $criteria, array $orderBy = null)
 * @method ClinicComplementaryInformation[]    findAll()
 * @method ClinicComplementaryInformation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClinicComplementaryInformationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ClinicComplementaryInformation::class);
    }

//    /**
//     * @return ClinicComplementaryInformation[] Returns an array of ClinicComplementaryInformation objects
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

//    public function findOneBySomeField($value): ?ClinicComplementaryInformation
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
