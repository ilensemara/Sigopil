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
        Schema::create('citizens', function (Blueprint $table) {
            $table->id();
            $table->string('slug_id')->unique();
            $table->string('role')->default('warga');
            $table->string('name');
            $table->string('nik_masked')->nullable();
            $table->string('nik_full')->unique();
            $table->string('reg_number')->nullable();
            $table->string('resi_number')->nullable();
            $table->string('courier_name')->nullable();
            $table->string('courier_service')->nullable();
            $table->string('courier_vehicle')->nullable();
            $table->string('courier_phone')->nullable();
            $table->string('eta_text')->nullable();
            $table->string('eta_time_window')->nullable();
            $table->text('address')->nullable();
            $table->string('service_type')->nullable();
            $table->string('status_badge')->nullable();
            $table->string('status_category')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('courier_avatar')->nullable();
            $table->string('submitted_at')->nullable();
            $table->json('documents')->nullable();
            $table->json('internal_timeline')->nullable();
            $table->json('shipping_timeline')->nullable();
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
        Schema::dropIfExists('citizens');
    }
};
