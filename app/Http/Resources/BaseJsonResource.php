<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

abstract class BaseJsonResource extends JsonResource
{
    private static $withDataKey;

    public $resource;

    public static function withDataKey() {
        self::$withDataKey = true;
    }


    public function toArray($request): array {
        
        if (self::$withDataKey) {
            $response = [
                'data' => $this->resource->asJsonResourceWithRelationships(),
            ];
        }else{
            return $this->resource->asJsonResourceWithRelationships();
        }     

        return $response;
    }
}
