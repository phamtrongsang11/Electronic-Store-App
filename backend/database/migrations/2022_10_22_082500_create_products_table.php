<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug');
            $table->integer('stock');
            $table->double('price');
            $table->string('image')->default("/images/p5.jpg");
            $table->double('screen');
            $table->integer('fcam');
            $table->integer('bcam');
            $table->string('os');
            $table->string('cpu');
            $table->string('gpu');
            $table->integer('ram');
            $table->integer('rom');
            $table->integer('battery');
            $table->double('weight');
            $table->date('released')->default(DB::raw('CURRENT_TIMESTAMP'));;
            $table->text('description');
            $table->foreignId('cate_id')->index()->constrained()->on('categories')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('brand_id')->index()->constrained()->on('brands')->cascadeOnDelete()->cascadeOnUpdate();
            $table->double('rating')->default(0);
            $table->integer('numReviews')->default(0);
            $table->boolean('is_active')->default(true);
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
        Schema::dropIfExists('products');
    }
};
