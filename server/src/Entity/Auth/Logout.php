<?php

namespace App\Entity\Auth;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/logout',
            openapiContext: [
                'summary' => 'Revoke JWT tokens',
                'description' => 'Refresh JWT token',
                'tags' => ['Login Check'],
                'responses' => [
                    '200' => [
                        'description' => 'Token refreshed successfully',
                    ],

                    '401' => [
                        'description' => 'Token refreshing failed',
                    ],
                ],
            ]
        )
    ]
)]
class Logout
{
}