<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TimeSlotsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TimeSlotsRepository::class)]
#[ApiResource]
class TimeSlots
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['clinics:read'])]
    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $start_time = null;

    #[Groups(['clinics:read'])]
    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $end_time = null;

    #[ORM\OneToMany(mappedBy: 'timeslot_id', targetEntity: ClinicSchedules::class)]
    private Collection $clinicSchedules;

    #[Groups(['clinics:read'])]
    #[ORM\Column(nullable: true)]
    private ?bool $isOpen = null;

    public function __construct()
    {
        $this->clinicSchedules = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->start_time;
    }

    public function setStartTime(?\DateTimeInterface $start_time): static
    {
        $this->start_time = $start_time;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->end_time;
    }

    public function setEndTime(?\DateTimeInterface $end_time): static
    {
        $this->end_time = $end_time;

        return $this;
    }

    /**
     * @return Collection<int, ClinicSchedules>
     */
    public function getClinicSchedules(): Collection
    {
        return $this->clinicSchedules;
    }

    public function addClinicSchedule(ClinicSchedules $clinicSchedule): static
    {
        if (!$this->clinicSchedules->contains($clinicSchedule)) {
            $this->clinicSchedules->add($clinicSchedule);
            $clinicSchedule->setTimeslotId($this);
        }

        return $this;
    }

    public function removeClinicSchedule(ClinicSchedules $clinicSchedule): static
    {
        if ($this->clinicSchedules->removeElement($clinicSchedule)) {
            // set the owning side to null (unless already changed)
            if ($clinicSchedule->getTimeslotId() === $this) {
                $clinicSchedule->setTimeslotId(null);
            }
        }

        return $this;
    }

    public function isIsOpen(): ?bool
    {
        return $this->isOpen;
    }

    public function setIsOpen(?bool $isOpen): static
    {
        $this->isOpen = $isOpen;

        return $this;
    }
}
