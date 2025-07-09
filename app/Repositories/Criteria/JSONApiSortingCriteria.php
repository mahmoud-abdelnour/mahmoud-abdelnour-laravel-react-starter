<?php

namespace App\Repositories\Criteria;

use App\Sorts\UserCustomSort;
use Illuminate\Http\Request;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Sorts\Sort;

use App\Models\Role;


use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class JSONApiSortingCriteria implements CriteriaInterface
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
    public function apply($model, RepositoryInterface $repository) {

        $sortingExists = $this->request->get('sort');
        if (empty($sortingExists) && isset($model->getModel()->defaultSort)) {
            $this->request->query->set('sort', $model->getModel()->defaultSort);
        }

        $searchableFields = $repository->getFieldsSearchable();
        return $this->checkModel($model,$searchableFields);

    }

    public function checkModel($model,$searchableFields){
        if ($model instanceof Relation || $model instanceof EloquentBuilder || is_string($model) || $model instanceof Model) {
            if ($model instanceof Model) {
                $model = get_class($model);
            }
            return QueryBuilder::for($model)
            ->allowedSorts($searchableFields)
            ->getEloquentBuilder();
        }
        return $model;
    }
}
