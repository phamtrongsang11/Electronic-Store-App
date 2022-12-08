<?php

namespace App\Http\Controllers;

use App\Models\Receive;
use App\Http\Requests\StoreReceiveRequest;
use App\Http\Requests\UpdateReceiveRequest;
use App\Models\Product;
use App\Models\ReceiveDetail;

class ReceiveController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show',]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $receives = Receive::all()->load("receive_details.product");
        return response()->json([
            'status' => 200,
            'receives' => $receives,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReceiveRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReceiveRequest $request)
    {
        $receive = Receive::create([
            'total_qty' => $request->input('total_qty'),
            'total_price' => $request->input('total_price'),
            'emp_id' => $request->input('emp_id'),
        ]);

        // $items = json_decode($request->input('orderItems'), true);

        foreach ($request->input('items') as $item) {
            $receive_details = ReceiveDetail::create([
                'receive_id' => $receive->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price'],
            ]);

            $product = Product::find($item['id']);

            if (!$product) {
                return response()->json(['status' => 404, 'message' => 'Product of this order_detail not found']);
            } else {
                $product->stock = $product->stock + $item['quantity'];
                $product->update();
            }
        }

        return response()->json(['status' => 200, 'message' => "Add order successfully", 'receive_id' => $receive->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Receive  $receive
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $receive = Receive::find($id)->load("receive_details.product");
        if (!$receive)
            return response()->json(['status' => 404, 'message' => 'Receive not found']);

        return response()->json(['receive' => $receive]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Receive  $receive
     * @return \Illuminate\Http\Response
     */
    public function edit(Receive $receive)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReceiveRequest  $request
     * @param  \App\Models\Receive  $receive
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReceiveRequest $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Receive  $receive
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $receive = Receive::find($id);
        if (!$receive) {
            return response()->json(['status' => 404, 'message' => 'Receive not found']);
        }

        $receive->delete();

        $receive_details = ReceiveDetail::where('receive_id', '=', $receive->id)->get();
        foreach ($receive_details as $item) {

            $product = Product::find($item['product_id']);

            if (!$product) {
                return response()->json(['status' => 404, 'message' => 'Product of this order_detail not found']);
            } else {
                $product->stock = $product->stock + $item['quantity'];
                $product->update();
            }
        }
        return response()->json([
            'status' => 200, 'message' => 'Deleted successfully'
        ]);
    }
}
