<?php

namespace App\Repository;

use App\Entity\Auth\User;
use App\Entity\Feedbacks;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Feedbacks>
 *
 * @method Feedbacks|null find($id, $lockMode = null, $lockVersion = null)
 * @method Feedbacks|null findOneBy(array $criteria, array $orderBy = null)
 * @method Feedbacks[]    findAll()
 * @method Feedbacks[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FeedbacksRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Feedbacks::class);
    }

    public function getFeedbacksByVeterinarianId(User $user): array
    {
        $veterinarianUuid = $user->getVeterinarian()->getUuid();

        return $this->createQueryBuilder('feedback')
            ->innerJoin('feedback.appointment', 'appointment')
            ->innerJoin('appointment.veterinarian', 'veterinarian')
            ->where('veterinarian.uuid = :veterinarianUuid')
            ->setParameter('veterinarianUuid', $veterinarianUuid)
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Feedbacks[] Returns an array of Feedbacks objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Feedbacks
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
