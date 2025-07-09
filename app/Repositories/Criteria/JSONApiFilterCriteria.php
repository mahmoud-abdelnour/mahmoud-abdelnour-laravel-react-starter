<?php

namespace App\Repositories\Criteria;

use App\Filters\CustomSearchFilter;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;


class JSONApiFilterCriteria implements CriteriaInterface
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
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $searchableFields = $repository->getFieldsSearchable();

        $searchableFields[] = AllowedFilter::custom('search', new CustomSearchFilter($searchableFields));
        
        $query =  $this->checkModel($model,$searchableFields);

        return $query;
    }

    public function checkModel($model,$searchableFields){
        if ($model instanceof Relation || $model instanceof EloquentBuilder || is_string($model) || $model instanceof Model) {
            if ($model instanceof Model) {
                $model = get_class($model);
            }
            

            return QueryBuilder::for($model)
            ->allowedFilters($searchableFields)
            ->getEloquentBuilder();
        }
        return $model;
    }
 
  

}
