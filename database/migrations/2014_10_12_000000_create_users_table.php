<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('bio')->nullable(); // Add bio field
            $table->string('image')->nullable(); // Add image field
            $table->json('my_posts')->nullable(); // Add my_posts field
            $table->json('fav_posts')->nullable(); // Add fav_posts field
            $table->integer('followers')->default(0); // Add followers count
            $table->integer('followings')->default(0); // Add followings count
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
