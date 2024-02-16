<?php

namespace App\Event;

use Symfony\Contracts\EventDispatcher\Event;
use App\Entity\Clinics;

class ClinicActivatedEvent extends Event
{
    public const NAME = 'clinic.activated';

    protected $clinic;

    public function __construct(Clinics $clinic)
    {
        $this->clinic = $clinic;
    }

    public function getClinic(): Clinics
    {
        return $this->clinic;
    }
}
