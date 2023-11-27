<?php

namespace App\Service;

use Geocoder\Provider\Nominatim\Nominatim;
use Geocoder\Query\GeocodeQuery;
use Geocoder\StatefulGeocoder;
use GuzzleHttp\Client as GuzzleAdapter;

class GeocoderService
{
    private $geocoder;

    public function __construct()
    {
        $httpClient = new GuzzleAdapter();
        $provider = new Nominatim($httpClient, 'https://nominatim.openstreetmap.org', 'VetoLib/1.0');
        $this->geocoder = new StatefulGeocoder($provider, 'fr');
    }

    public function getCoordinates(string $address): array
    {
        $result = $this->geocoder->geocodeQuery(GeocodeQuery::create($address));
        $firstResult = $result->first();
        return [$firstResult->getCoordinates()->getLatitude(), $firstResult->getCoordinates()->getLongitude()];
    }
}