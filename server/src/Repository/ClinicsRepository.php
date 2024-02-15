<?php

namespace App\Repository;

use App\Entity\Clinics;
use App\Entity\Veterinarians;
use App\Entity\Appointments;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\QueryBuilder;

/**
 * @extends ServiceEntityRepository<Clinics>
 *
 * @method Clinics|null find($id, $lockMode = null, $lockVersion = null)
 * @method Clinics|null findOneBy(array $criteria, array $orderBy = null)
 * @method Clinics[]    findAll()
 * @method Clinics[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClinicsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Clinics::class);
    }

    /**
     * @return Appointments[] Returns an array of Appointments objects
     */
    public function findAllAppointmentsForClinicByStatus($manager, $status): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.manager = :manager')
            ->setParameter('manager', $manager)
            ->leftJoin('c.veterinarians', 'v')
            ->leftJoin('v.appointments', 'a')
            ->andWhere('a.status = :status')
            ->setParameter('status', $status)
            ->getQuery()
            ->getResult()
        ;
    } 

    /**
     * @return Veterinarians[] Returns the number of veterinarians in a clinic
     */
    public function countVeterinariansInClinic($clinic): int
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :clinic')
            ->setParameter('clinic', $clinic)
            ->leftJoin('c.veterinarians', 'v')
            ->select('COUNT(v.id)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    /**
     * @return Clinic[] Returns all clinics for a manager
     */
    public function findClinicsByManager($manager): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.manager = :manager')
            ->setParameter('manager', $manager)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return Veterinarians[] Returns the number of veterinarians to all clinics for a manager 
     */
    public function countVeterinariansInManagerClinics($clinics): int
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c IN (:clinics)')
            ->setParameter('clinics', $clinics)
            ->leftJoin('c.veterinarians', 'v')
            ->select('COUNT(v.id)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    /**
     * @return Clinics[] Returns the number of clinics for a manager
     */
    public function countClinicsByManager($manager): int
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.manager = :manager')
            ->setParameter('manager', $manager)
            ->select('COUNT(c.id)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    /** 
     * @return Appointments[] Returns the number of scheduled Appointments objects of all veterinarians in all clinics for a manager
     */
    public function countScheduledAppointmentsInManagerClinics($manager, $status): int
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c IN (:clinics)')
            ->setParameter('clinics', $manager)
            ->leftJoin('c.veterinarians', 'v')
            ->leftJoin('v.appointments', 'a')
            ->andWhere('a.status = :status')
            ->setParameter('status', $status)
            ->select('COUNT(a.id)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

//    /**
//     * @return Clinics[] Returns an array of Clinics objects
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

//    public function findOneBySomeField($value): ?Clinics
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
