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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->String('name');
            $table->String('phone');
            $table->String('address');
            $table->String('city');
            $table->date('date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->String('payment_method');
            $table->boolean('is_paid')->default(false);
            // $table->date('paid_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->date('paid_at')->nullable();
            $table->boolean('is_delivered')->default(false);
            $table->date('delivered_at')->nullable();
            $table->double('items_price');
            $table->double('shipping_price');
            $table->double('tax_price');
            $table->double('total_price');
            $table->bigInteger('emp_id')->unsigned()->nullable();
            $table->foreign('emp_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('cus_id')->index()->constrained()->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->bigInteger('status_id')->unsigned()->default(1);
            $table->foreign('status_id')->references('id')->on('statuses')->cascadeOnDelete()->cascadeOnUpdate();
            // $table->foreign('emp_id')->index()->constrained()->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            // $table->foreignId('status_id')->index()->constrained()->on('statuses')->cascadeOnDelete()->cascadeOnUpdate()->default(1);
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
        Schema::dropIfExists('orders');
    }
};
