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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id('blog_id'); // Blog ID
            $table->string('title'); // Blog title
            $table->text('desc'); // Blog description
            $table->string('image')->nullable(); // Blog image (optional)
            $table->string('author'); // Blog author
            $table->string('tag')->default('Upcoming'); // Tags as JSON
            $table->enum('category', ['tips', 'news']); // Blog category (tips/news)
            $table->integer('likes')->default(0); // Likes count
            $table->integer('dislikes')->default(0); // Dislikes count
            $table->json('comments')->nullable(); // Comments as JSON
            $table->timestamps(); // Created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
};
