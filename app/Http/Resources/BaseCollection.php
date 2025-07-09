<?php

namespace App\Http\Resources;

use App\Models\Contracts\JsonResourceful;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;


class BaseCollection extends ResourceCollection {

 
    public function toArray(Request $request) : array {
        $response = [
            'data' => $this->collection->map(function (JsonResource $resource) use ($request) {
                return $resource->toArray($request);
            }),
        ];

        return $response;
    }
}
