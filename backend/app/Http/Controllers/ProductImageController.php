<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use App\Http\Requests\StoreProductImageRequest;
use App\Http\Requests\UpdateProductImageRequest;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
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
     * @param  \App\Http\Requests\StoreProductImageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product_image = ProductImage::create([
            "product_id" => $request->input('product_id'),
            "image" => $request->input('image')
        ]);

        $product_image->load('product');
        return response()->json(['status' => 200, "message" => "Inserted successfully", "product_image" => $product_image]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function show(ProductImage $productImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductImage $productImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductImageRequest  $request
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductImageRequest $request, ProductImage $productImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product_image = ProductImage::find($id);
        if (!$product_image) {
            return response()->json(['status' => 404, 'message' => 'Product_image not found']);
        }

        $product_image->delete();
        return response()->json([
            'status' => 200, 'message' => 'Deleted successfully', "id" => $id
        ]);
    }

    public function getImagesProduct($id)
    {
        $product_images = ProductImage::where('product_id', '=', $id)->with("product")->get();

        if (!$product_images) {
            return response()->json(['status' => 404, 'message' => 'Product_images not found']);
        }

        return response()->json([
            'status' => 200,
            'product_images' => $product_images,
        ]);
    }
}
