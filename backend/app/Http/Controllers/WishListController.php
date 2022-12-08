<?php

namespace App\Http\Controllers;

use App\Models\WishList;
use App\Http\Requests\StoreWishListRequest;
use App\Http\Requests\UpdateWishListRequest;
use Illuminate\Http\Request;

class WishListController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show', 'getWishListByUser']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreWishListRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cus_id = $request->input('cus_id');
        $product_id = $request->input('product_id');

        $exist = WishList::where('product_id', '=', $product_id)->where('cus_id', '=', $cus_id)->first();
        if ($exist)
            return response()->json(['status' => 404, "message" => "This product have already in your wishlist!!!"]);

        $wishlist = WishList::create([
            'cus_id' => $cus_id,
            'product_id' => $product_id,
        ]);

        return response()->json(['status' => 200, "message" => "Save successfully"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WishList  $wishList
     * @return \Illuminate\Http\Response
     */
    public function show(WishList $wishList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\WishList  $wishList
     * @return \Illuminate\Http\Response
     */
    public function edit(WishList $wishList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWishListRequest  $request
     * @param  \App\Models\WishList  $wishList
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWishListRequest $request, WishList $wishList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WishList  $wishList
     * @return \Illuminate\Http\Response
     */
    public function destroy(WishList $wishList)
    {
        //
    }

    public function getWishListByUser($id)
    {
        $wishlists = WishList::where('cus_id', '=', $id)->with("product")->get();

        if (!$wishlists) {
            return response()->json(['status' => 404, 'message' => 'Wishlists not found']);
        }

        return response()->json([
            'status' => 200,
            'wishlists' => $wishlists,
        ]);
    }
}
