<?php

namespace App\Service;

use Symfony\Component\Notifier\Message\SmsMessage;
use Symfony\Component\Notifier\TexterInterface;

class PushNotificationService
{
    public function __construct(private TexterInterface $texter) {}

    public function sendMessage(string $message, string $phone): void
    {
        $sms = new SmsMessage(
            $phone,
            "Vetcare \n" . $message,
            '+14345973473'
        );

        $this->texter->send($sms);
    }

}
