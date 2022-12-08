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
        Schema::create('order_details', function (Blueprint $table) {
            $table->foreignId('order_id')->index()->constrained()->on('orders')->cascadeOnDelete()->cascadeOnUpdate();
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
        Schema::dropIfExists('order_details');
    }
};
