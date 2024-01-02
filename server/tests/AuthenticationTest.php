<?php

namespace App\Tests;

use App\Entity\Auth\User;

final class AuthenticationTest extends AbstractTest
{
    private static ?string $refreshToken = null;
    private static ?string $token = null;

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => 'register@user.fr']);
        $entityManager->remove($user);
        $entityManager->flush();
    }

    public function testUnregisterLogin(): void
    {
        static::createClient()->request('POST', '/api/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'login@user.fr',
                'password' => 'test',
            ]
        ]);

        $this->assertResponseStatusCodeSame(401);
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertJsonContains([
            'code' => 401,
            'message' => 'Invalid credentials.',
        ]);
    }

    public function testRegister(): void
    {
        $response = static::createClient()->request('POST', '/api/users', ['json' => [
            'firstname' => 'test',
            'lastname' => 'test',
            'email' => 'register@user.fr',
            'plainPassword' => 'test',
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/User',
            '@type' => 'User',
            'firstname' => 'test',
            'lastname' => 'test',
            'email' => 'register@user.fr',
        ]);
        $this->assertMatchesRegularExpression('~^/api/users/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$~', $response->toArray()['@id']);
        $this->assertMatchesRegularExpression('~^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$~', $response->toArray()['uuid']);
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testLogin(): void
    {
        $response = static::createClient()->request('POST', '/api/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'register@user.fr',
                'password' => 'test',
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertArrayHasKey('token', $response->toArray());
        $this->assertArrayHasKey('refresh_token', $response->toArray());
        self::$token = $response->toArray()['token'];
        self::$refreshToken = $response->toArray()['refresh_token'];
    }

    public function testNewRefreshToken(): void
    {
        $response = static::createClient()->request('POST', '/api/token/refresh', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'refresh_token' => self::$refreshToken,
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertArrayHasKey('token', $response->toArray());
        $this->assertArrayHasKey('refresh_token', $response->toArray());
        $this->assertNotEquals(self::$refreshToken, $response->toArray()['refresh_token']);
    }

    public function testGetUserConnected(): void
    {
        $this->createClientWithCredentials(self::$token)->request('GET', '/api/users/current/me');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            "@context" =>  "/api/contexts/User",
            "@id" =>  "/api/users/current/me",
            "@type" =>  "User",
            "email" =>  "register@user.fr"
        ]);
    }

    public function testLogout(): void
    {
        $this->createClientWithCredentials(self::$token)->request('POST', '/api/logout', [
            'headers' => ['Content-Type' => 'application/ld+json; charset=utf-8'],
            'json' => [
                'refresh_token' => self::$refreshToken,
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            "@context" => "/api/contexts/Logout",
            "@type" => "Logout"
        ]);
    }
}