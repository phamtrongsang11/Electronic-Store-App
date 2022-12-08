<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserSeeder extends Seeder
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
        $users = $data['users'];
        foreach ($users as $user) {
            User::query()->updateOrCreate([

                'fname' => $user['fname'],
                'lname' => $user['lname'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'phone' => $user['phone'],
                'image' => $user['image'],
                'phone' => $user['phone'],
                'address' => $user['address'],
                'role_id' => $user['role_id'],
            ]);
        }
    }
}
