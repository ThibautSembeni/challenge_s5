<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Auth\User;
use App\Factory\Auth\UserFactory;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

final class UsersTest extends AbstractTest
{
    use Factories;

    public function testGetCollection(): void
    {
        // Create 100 users using our factory
        UserFactory::createMany(100);

        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = $this->createClientWithCredentials()->request('GET', '/api/users');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            '@context' => '/api/contexts/User',
            '@id' => '/api/users',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100 + 1,
            'hydra:view' => [
                '@id' => '/api/users?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/api/users?page=1',
                'hydra:last' => '/api/users?page=4',
                'hydra:next' => '/api/users?page=2',
            ],
        ]);

        // Because test fixtures are automatically loaded between each test, you can assert on them
        $this->assertCount(30, $response->toArray()['hydra:member']);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        // This generated JSON Schema is also used in the OpenAPI spec!
        $this->assertMatchesResourceCollectionJsonSchema(User::class);
    }

    public function testCreateUser(): void
    {
        $response = static::createClient()->request('POST', '/api/users', ['json' => [
            'firstname' => 'test',
            'lastname' => 'test',
            'email' => 'create@user.fr',
            'plainPassword' => 'test',
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/User',
            '@type' => 'User',
            'firstname' => 'test',
            'lastname' => 'test',
            'email' => 'create@user.fr',
            'clinic' => [],
        ]);
        $this->assertMatchesRegularExpression('~^/api/users/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$~', $response->toArray()['@id']);
        $this->assertMatchesRegularExpression('~^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$~', $response->toArray()['uuid']);
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testCreateInvalidUser(): void
    {
        static::createClient()->request('POST', '/api/users', ['json' => [
            'email' => 'invalid',
        ]]);

        $this->assertResponseStatusCodeSame(422);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/api/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
            'hydra:description' => 'email: This value is not a valid email address.',
            'violations' => [
                [
                    'propertyPath' => 'email',
                    'message' => 'This value is not a valid email address.',
                    'code' => 'bd79c0ab-ddba-46cc-a703-a7a4b08de310',
                ],
            ],
        ]);
    }

    public function testUpdateUser(): void
    {
        UserFactory::createOne(['email' => 'insert@user.fr']);

        $client = $this->createClientWithCredentials();
        // findIriBy allows to retrieve the IRI of an item by searching for some of its properties.
        $iri = $this->findIriBy(User::class, ['email' => 'insert@user.fr']);

        // Use the PATCH method here to do a partial update
        $client->request('PATCH', $iri, [
            'json' => [
                'firstname' => 'Franck',
            ],
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => $iri,
            'email' => 'insert@user.fr',
            'firstname' => 'Franck',
        ]);
    }

    public function testDeleteUser(): void
    {
        UserFactory::createOne(['email' => 'delete@user.fr']);

        $client = $this->createClientWithCredentials();
        $iri = $this->findIriBy(User::class, ['email' => 'delete@user.fr']);

        $client->request('DELETE', $iri);

        $this->assertResponseStatusCodeSame(204);
        // Through the container, you can access all your services from the tests, including the ORM, the mailer, remote API clients...
        $user = static::getContainer()->get('doctrine')->getRepository(User::class)->findOneBy(['email' => 'delete@user.fr']);
        // Assert the user has been deleted with soft delete
        $this->assertNotNull($user->getDeletedAt());
    }
}