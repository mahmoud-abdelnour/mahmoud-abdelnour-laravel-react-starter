<?php

namespace App\Http\Requests;

use App\Responses\ApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class BaseRequest extends FormRequest{

    protected function failedValidation(Validator $validator){
        
        $response = app(ApiResponse::class);
        
        throw new HttpResponseException(
            $response->setCode(Response::HTTP_UNPROCESSABLE_ENTITY)
                ->setErrors($validator->errors()->toArray())
                ->setData([])
                ->create()
        );
    }
}
