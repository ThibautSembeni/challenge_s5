<?php

namespace App\DataFixtures;

use App\Story\DefaultTimeSlotsStory;
use App\Story\DefaultUsersStory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        DefaultUsersStory::load();
        DefaultTimeSlotsStory::load();
//        $manager->flush();
    }
}
