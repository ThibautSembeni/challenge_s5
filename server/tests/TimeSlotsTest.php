<?php


use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Auth\User;
use App\Entity\TimeSlots;
use App\Factory\Auth\UserFactory;
use App\Factory\TimeSlotsFactory;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

final class TimeSlotsTest extends \App\Tests\AbstractClass
{
    use Factories;

    public function testGetCollection(): void
    {
        TimeSlotsFactory::createMany(100);

        $response = $this->createClientWithCredentials()->request('GET', '/api/time_slots');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            '@context' => '/api/contexts/TimeSlots',
            '@id' => '/api/time_slots',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100,
        ]);

        // Because test fixtures are automatically loaded between each test, you can assert on them
        $this->assertCount(30, $response->toArray()['hydra:member']);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        // This generated JSON Schema is also used in the OpenAPI spec!
        $this->assertMatchesResourceCollectionJsonSchema(User::class);
    }

    public function testCreate(): void
    {
        $date = new DateTime();
        static::createClientWithCredentials()->request('POST', '/api/time_slots', ['json' => [
            'startTime' => $date->format('H:i:s'),
            'endTime' => (clone $date)->modify('+1 hour')->format('H:i:s'),
            'isOpen' => true,
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/TimeSlots',
            '@type' => 'TimeSlots',
            'start_time' => '1970-01-01T'.$date->format('H:i:s').'+01:00',
            'end_time' => '1970-01-01T'.(clone $date)->modify('+1 hour')->format('H:i:s').'+01:00',
            'isOpen' => true,
        ]);
        $this->assertMatchesResourceItemJsonSchema(TimeSlots::class);
    }
}