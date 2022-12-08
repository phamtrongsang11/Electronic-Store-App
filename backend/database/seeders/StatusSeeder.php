<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = Storage::disk('local')->get('/json/data.json');
        $data = json_decode($json, true);
        $statuses = $data['statuses'];
        foreach ($statuses as $status) {
            Status::query()->updateOrCreate([
                "id" => $status['id'],
                "name" => $status['name'],
                "desc" => $status['desc']
            ]);
        }
    }
}
