<?php

namespace App\Traits;

use App\Models\Contracts\JsonResourceful;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

//echo "HasJsonResourcefulData<br>";

trait HasJsonResourcefulData
{
    


    public function getIdFilterFields(): array
    {
        return [];
    }

    public function getResourceType()
    {
        return defined('static::JSON_API_TYPE') ? static::JSON_API_TYPE : '';
    }

    public function prepareData()
    {
        return [
            'type' => $this->getResourceType(),
            'id' => $this->id,
        ];
    }

    public function asJsonResourceWithRelationships()
    {
        $jsonResource = $this->asJsonResource();


        return $jsonResource;
    }

    public function asJsonResource(): array
    {
        $preparedAttributes = $this->prepareAttributes();

        return array_merge(
            $this->prepareData(),
            [
                'attributes' => $preparedAttributes,
                'links' => $this->prepareLinks(),
            ]
        );
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
   

    /**
     * Links for given relationships list records filter by this record
     */
    public function relationLinks(): array
    {
        return [];
    }

  
}
