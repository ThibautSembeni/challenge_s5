<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Symfony\Bundle\Test\Client;
use App\Entity\Auth\User;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Zenstruck\Foundry\Test\ResetDatabase;

abstract class AbstractClass extends ApiTestCase
{
    private ?string $token = null;
    private ?string $refresh_token = null;
    private static ?ContainerInterface $container = null;


    use ResetDatabase;

    public static function setUpBeforeClass(): void
    {
        self::bootKernel();
        self::$container = self::$kernel->getContainer();
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => 'user@user.fr']);

        if (!$user) {
            $user = new User();
            $user->setFirstname('User');
            $user->setLastname('User');
            $user->setEmail('user@user.fr');
            $user->setPassword(static::getContainer()->get('security.user_password_hasher')->hashPassword($user, '$3CR3T'));

            $entityManager->persist($user);
            $entityManager->flush();
        }
    }

    protected function createClientWithCredentials($token = null): Client
    {
        $token = $token ?: $this->getToken();

        return static::createClient([], ['headers' => ['authorization' => 'Bearer '.$token]]);
    }

    protected function getToken($body = []): string
    {
        if ($this->token) {
            return $this->token;
        }

        $response = static::createClient()->request('POST', '/api/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => $body ?: [
                'email' => 'user@user.fr',
                'password' => '$3CR3T',
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $data = $response->toArray();
        $this->token = $data['token'];
        $this->refresh_token = $data['refresh_token'];

        return $data['token'];
    }

    protected function getRefreshToken($body = []): string
    {
        if ($this->refresh_token) {
            return $this->refresh_token;
        }

        $response = static::createClient()->request('POST', '/api/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => $body ?: [
                'email' => 'user@user.fr',
                'password' => '$3CR3T',
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $data = $response->toArray();
        $this->token = $data['token'];
        $this->refresh_token = $data['refresh_token'];

        return $data['refresh_token'];
    }
}