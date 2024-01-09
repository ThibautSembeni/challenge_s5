<?php

declare(strict_types=1);

namespace App\Enum;

enum AppointmentsStatusEnum: string
{
    case STATUS_SCHEDULED = 'scheduled';
    case STATUS_IN_PROGRESS = 'in progress';
    case STATUS_COMPLETED = 'completed';
    case STATUS_CANCELLED = 'cancelled';
}
