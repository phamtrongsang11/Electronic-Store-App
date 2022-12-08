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
        Schema::create('receive_details', function (Blueprint $table) {
            $table->foreignId('receive_id')->index()->constrained()->on('receives')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('product_id')->index()->constrained()->on('products')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('quantity');
            $table->double('price');
            $table->double('subtotal');
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
        Schema::dropIfExists('receive_details');
    }
};
