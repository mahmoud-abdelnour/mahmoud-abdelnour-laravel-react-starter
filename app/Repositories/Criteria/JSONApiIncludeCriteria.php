<?php

namespace App\Repositories\Criteria;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;
use Spatie\QueryBuilder\QueryBuilder;


use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

class JSONApiIncludeCriteria implements CriteriaInterface
{
    /**
     * @var Request
     */
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Apply criteria in query repository.
     *
     * @return Builder|mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {

        /** @var BaseRepository $baseRepository */
        $baseRepository = $repository;

        $availableRelations = $baseRepository->getAvailableRelations();

      
        return $this->checkModel($model,$availableRelations);
    
    }

    public function checkModel($model,$availableRelations){
        if ($model instanceof Relation || $model instanceof EloquentBuilder || is_string($model) || $model instanceof Model) {
            if ($model instanceof Model) {
                $model = get_class($model);
            }

            return QueryBuilder::for($model)
            ->allowedIncludes($availableRelations)
            ->getEloquentBuilder();
        }
        return $model;
    }
}
