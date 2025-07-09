<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

use Symfony\Component\HttpFoundation\Response as ResponseAlias;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //



    /*     $exceptions->render(function (UnprocessableEntityHttpException $e, Request $request) {
       
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Record not found.'
                ], 404);
            } 

        }); */

       /*  $exceptions->render(function (ValidationException $e, Request $request) {
       
                return response()->json([
                    'message' => 'Record not found.'
                ], 404);

        }); */

        
     /*    $exceptions->render(function (NotFoundHttpException $e, Request $request) {
       
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Record not found.'
                ], 404);
            } 

        });

        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $exception) {
            if ($exception instanceof ValidationException) {

                $firstError = collect($exception->errors())->first();
                   
                return response()->json(new JSONApiError([
                    'success' => false,
                    'message' => $firstError[0],
                ]), ResponseAlias::HTTP_UNPROCESSABLE_ENTITY); 
            }
            return $request->expectsJson();
        }); */
        
        
    })->create();
