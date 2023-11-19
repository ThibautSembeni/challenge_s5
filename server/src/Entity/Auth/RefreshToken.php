<?php

namespace App\Entity\Auth;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;

#[ORM\Entity]
#[ORM\Table(name: 'refresh_tokens')]
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/token/refresh',
            openapiContext: [
                'summary' => 'Refresh JWT token',
                'description' => 'Refresh JWT token',
                'tags' => ['Login Check'],
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    "refresh_token" => [
                                        "type" => "string",
                                        "example" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2ZjY5ZjQ4LWY5ZjUtNDU5ZS1hZjYwLWY5ZjU1ZjU1ZjU1ZiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTYyNjQ0NjQ4NSwiZXhwIjox"
                                    ]
                                ]
                            ],
                        ],
                    ],
                ],
                'responses' => [
                    '200' => [
                        'description' => 'Token refreshed successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        "token" => [
                                            "type" => "string",
                                        ],
                                        "refresh_token" => [
                                            "type" => "string",
                                        ]
                                    ]
                                ],
                            ],
                        ],
                    ],
                    '401' => [
                        'description' => 'Token refreshing failed',
                    ],
                ],
            ]
        )
    ]
)]
class RefreshToken extends BaseRefreshToken
{
}