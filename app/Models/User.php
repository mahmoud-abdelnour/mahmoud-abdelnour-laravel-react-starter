<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\HasMedia;
use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;

//class User extends Authenticatable implements  HasMedia, JsonResourceful
class User extends Authenticatable implements  HasMedia ,JsonResourceful
{
    use HasFactory, Notifiable , HasApiTokens , HasRoles , InteractsWithMedia  , HasJsonResourcefulData;

    const JSON_API_TYPE = 'users';

    public const PATH = 'user_image';

    protected $appends = ['image_url'];


    public static $rules = [
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'phone' => 'required|numeric|unique:users',
        'password' => 'required|min:6',
        'confirm_password' => 'required|min:6|same:password',
    ];

    public static $availableRelations = [
      
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
   

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function prepareLinks(): array {
        return [
            //'self' => route('users.show', $this->id),
            'self' => ''
        ];
    }

    public function prepareAttributes(): array {
        $fields = [
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'image' => $this->image_url,
            'role' => $this->roles,
            'created_at' => $this->created_at,
        ];

        return $fields;
    }

    public function getImageUrlAttribute(): string
    {
        /** @var Media $media */
        $media = $this->getMedia(User::PATH)->first();
      
        if (! empty($media)) {
            return $media->getFullUrl();
        }

        return '';
    }

   

}
