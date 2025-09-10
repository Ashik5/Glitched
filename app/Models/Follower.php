<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'followers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'follower_id',
        'following_id',
    ];

    /**
     * Get the user who is the follower.
     */
    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

    /**
     * Get the user who is being followed.
     */
    public function following()
    {
        return $this->belongsTo(User::class, 'following_id');
    }
}
