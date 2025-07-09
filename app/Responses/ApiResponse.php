<?php

namespace App\Responses;

use Illuminate\Http\JsonResponse;

class ApiResponse extends Response
{
    /**
     * Messages.
     *
     * @var array
     */
    protected $messages = [];

    /**
     * Meta Data.
     *
     * @var array
     */
    protected $meta = [];

    public function create(): JsonResponse
    {
        return new JsonResponse(
            [
                'code' => $this->getCode(),
                'errors' => $this->getErrors(),
                'data' => $this->getData(),
                'messages' => $this->getMessages(),
                'meta' => $this->getMeta()
            ],
            $this->getCode()
        );
    }

    public function getMessages(): array
    {
        return $this->messages;
    }

    public function setMessages(array $messages): ApiResponse
    {
        $this->messages = $messages;
        return $this;
    }

    public function getMeta(): array
    {
        return $this->meta;
    }

    public function setMeta(array $meta): ApiResponse
    {
        $this->meta = $meta;
        return $this;
    }
}
