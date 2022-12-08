<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function getTotalProduct()
    {
        $total_product = DB::table('products')
            ->selectRaw('COUNT(*) AS result')
            ->first();

        return response()->json([
            'status' => 200,
            'total_product' => $total_product,
        ]);
    }

    public function getTotalCustomer()
    {
        $total_customer = DB::table('users')
            ->selectRaw('COUNT(*) AS result')
            ->where('role_id', '=', '1')
            ->first();

        return response()->json([
            'status' => 200,
            'total_customer' => $total_customer,
        ]);
    }

    public function getTotalEmployee()
    {
        $total_employee = DB::table('users')
            ->selectRaw('COUNT(*) AS result')
            ->where('role_id', '!=', '1')
            ->first();

        return response()->json([
            'status' => 200,
            'total_employee' => $total_employee,
        ]);
    }

    public function getTotalOrderToday()
    {
        $total_order = DB::table('orders')
            ->selectRaw('COUNT(*) AS result')
            ->first();

        return response()->json([
            'status' => 200,
            'total_order' => $total_order,
        ]);
    }

    public function getRevenueYear()
    {
        $revenue = array();
        for ($i = 1; $i <= 12; $i++) {
            $value = DB::table('orders')
                ->selectRaw('SUM(total_price) AS result')
                ->whereMonth('date', $i)
                ->first();
            array_push($revenue, $value);
        }

        return response()->json([
            'status' => 200,
            'revenue' =>  $revenue,
        ]);
    }
}
