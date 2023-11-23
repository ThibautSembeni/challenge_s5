<?php

namespace App\Repository;

use App\Entity\Veterinarians;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Veterinarians>
 *
 * @method Veterinarians|null find($id, $lockMode = null, $lockVersion = null)
 * @method Veterinarians|null findOneBy(array $criteria, array $orderBy = null)
 * @method Veterinarians[]    findAll()
 * @method Veterinarians[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VeterinariansRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Veterinarians::class);
    }

//    /**
//     * @return Veterinarians[] Returns an array of Veterinarians objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('v.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Veterinarians
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
