<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class RoleSeeder extends Seeder
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
        $roles = $data['roles'];
        foreach ($roles as $role) {
            Role::query()->updateOrCreate([
                "id" => $role['id'],
                "name" => $role['name'],
                "desc" => $role['desc']
            ]);
        }
    }
}
