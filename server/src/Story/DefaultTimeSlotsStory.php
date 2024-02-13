<?php

namespace App\Story;

use App\Factory\TimeSlotsFactory;
use Zenstruck\Foundry\Story;

final class DefaultTimeSlotsStory extends Story
{
    public function build(): void
    {
        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
        TimeSlotsFactory::createMany(100);
    }
}
