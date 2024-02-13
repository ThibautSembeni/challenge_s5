<?php

namespace App\Factory;

use App\Entity\TimeSlots;
use App\Repository\TimeSlotsRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<TimeSlots>
 *
 * @method        TimeSlots|Proxy                     create(array|callable $attributes = [])
 * @method static TimeSlots|Proxy                     createOne(array $attributes = [])
 * @method static TimeSlots|Proxy                     find(object|array|mixed $criteria)
 * @method static TimeSlots|Proxy                     findOrCreate(array $attributes)
 * @method static TimeSlots|Proxy                     first(string $sortedField = 'id')
 * @method static TimeSlots|Proxy                     last(string $sortedField = 'id')
 * @method static TimeSlots|Proxy                     random(array $attributes = [])
 * @method static TimeSlots|Proxy                     randomOrCreate(array $attributes = [])
 * @method static TimeSlotsRepository|RepositoryProxy repository()
 * @method static TimeSlots[]|Proxy[]                 all()
 * @method static TimeSlots[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static TimeSlots[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static TimeSlots[]|Proxy[]                 findBy(array $attributes)
 * @method static TimeSlots[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static TimeSlots[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class TimeSlotsFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        $start_time = self::faker()->dateTime();
        $end_time = (clone $start_time)->add(new \DateInterval('PT' . self::faker()->numberBetween(1, 8) . 'H'));
        return [
            'start_time' => $start_time,
            'end_time' => $end_time,
            'isOpen' => self::faker()->boolean(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(TimeSlots $timeSlots): void {})
        ;
    }

    protected static function getClass(): string
    {
        return TimeSlots::class;
    }
}
