<?php

namespace App\Controller\Front;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use OpenAI;

class TranslationController extends AbstractController
{
    public function __invoke(Request $request, HttpClientInterface $httpClient)
    {
        try {
            $client = OpenAI::client($_ENV['OPENAI_API_KEY']);

            $data = json_decode($request->getContent(), true);
            $message = $data['message'] ?? '';

            $response = $client->chat()->create([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Tu es un professionnel de la traduction de la langue française à anglaise.'
                                    . 'Tu devras traduire tout le contenu du site internet de français à anglais.'
                                    . 'Dès que l\'utilisateur sélectionnera la langue anglaise tu devras traduire tout le contenu du site en anglais.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $message
                    ],
                ],
            ]);

            $openaiResponse = $response->toArray();

            return $this->json(['response' => $openaiResponse['choices'][0]['message']['content']]);
        } catch (TransportExceptionInterface | ClientExceptionInterface | ServerExceptionInterface $e) {
            return new Response($e->getMessage(), $e->getCode());
        } catch (\Exception $e) {
            return new Response($e->getMessage(), $e->getCode());
        }
    }
}