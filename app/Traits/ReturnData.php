<?php
namespace App\Traits;

trait ReturnData{

    /**
     * Create return data for ApiResponse
     */
    public function createReturnData(array $errors, int $code, $data = null, array $message = [], array $meta = []): array{
        return [
            'errors' => $errors,
            'code' => $code,
            'data' => $data,
            'messages' => $message,
            'meta' => $meta,
        ];
    }
}
