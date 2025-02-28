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
            $table->id('blog_id'); 
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->unsignedBigInteger('author'); // Foreign key to users table
            $table->string('tag')->nullable(); // e.g., Valorant, CS:GO
            $table->string('category')->nullable();
            $table->string('status')->default('pending'); // e.g., Tips, News
            $table->integer('likes')->default(0);
            $table->integer('dislikes')->default(0);
            $table->json('comments')->nullable();
            $table->timestamps();

            // Define foreign key constraint for author
            $table->foreign('author')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
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
