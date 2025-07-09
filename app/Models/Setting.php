<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Setting extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    const PATH = 'settings';

    protected $table = 'settings';

    protected $fillable = [
        'key',
        'value',
    ];

    public static $availableRelations = [
      
    ];

    public function getLogoAttribute(): string {
     
        $media = $this->media->last();
        if (! empty($media)) {
            return $media->getFullUrl();
        }

        return asset('images/dashboard-logo.png');
    }
}
