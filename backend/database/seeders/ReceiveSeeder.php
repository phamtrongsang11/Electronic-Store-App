<?php

namespace Database\Seeders;

use App\Models\Receive;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ReceiveSeeder extends Seeder
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
        $receives = $data['receives'];
        foreach ($receives as $receive) {
            Receive::query()->updateOrCreate([
                "date" => $receive['date'],
                "total_qty" => $receive['total_qty'],
                "total_price" => $receive['total_price'],
                "emp_id" => $receive['emp_id']
            ]);
        }
    }
}
