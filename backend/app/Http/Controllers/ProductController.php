<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    protected $PAGE_SIZE = 6;

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show', 'search', 'findSlug', 'relativeProduct', 'getProductHome']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // $products = Product::select('id', 'name', 'slug', 'price', 'stock', 'rating', 'numReviews', 'image', 'cate_id', 'brand_id')->get();
        $products = Product::all()->load(['categories', 'brands']);
        return response()->json([
            'status' => 200,
            'products' => $products,
        ]);
    }

    public function getProductHome()
    {

        $products = Product::select('id', 'name', 'slug', 'price', 'stock', 'rating', 'numReviews', 'image', 'cate_id', 'brand_id')->where("is_active", "=", 1)->get();

        return response()->json([
            'status' => 200,
            'products' => $products,
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
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        // $product = Product::create($request->all());
        $product = Product::create([
            "name" => $request->input('name'),
            "slug" => Str::slug($request->input('name')),
            "stock" => 0,
            "price" => $request->input('price'),
            "image" => $request->input('image'),
            "screen" => $request->input('screen'),
            "fcam" => $request->input('fcam'),
            "bcam" => $request->input('bcam'),
            "os" => $request->input('os'),
            "cpu" => $request->input('cpu'),
            "gpu" => $request->input('gpu'),
            "ram" => $request->input('ram'),
            "rom" => $request->input('rom'),
            "battery" => $request->input('battery'),
            "weight" => $request->input('weight'),
            "released" => $request->input('released'),
            "description" => $request->input('description'),
            "rating" => 0,
            "numReviews" => 0,
            "cate_id" => $request->input('category'),
            "brand_id" => $request->input('brand')
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Inserted successfully',
            'product' => $product,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product)

            return response()->json(['status' => 404, 'message' => 'Product not found']);

        $product->load(['categories', 'brands', 'reviews']);

        return response()->json(['status' => 200, 'product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found']);
        }

        // $product->update($request->all());

        $product->name = $request->input('name');
        $product->slug = Str::slug($request->input('name'));
        $product->price = $request->input('price');
        $product->image = $request->input('image');
        $product->screen = $request->input('screen');
        $product->fcam = $request->input('fcam');
        $product->bcam = $request->input('bcam');
        $product->os = $request->input('os');
        $product->cpu = $request->input('cpu');
        $product->gpu = $request->input('gpu');
        $product->ram = $request->input('ram');
        $product->rom = $request->input('rom');
        $product->battery = $request->input('battery');
        $product->weight = $request->input('weight');
        $product->released = $request->input('released');
        $product->description = $request->input('description');
        $product->cate_id = $request->input('category');
        $product->brand_id = $request->input('brand');

        $product->update();

        return response()->json(['status' => 200, 'message' => 'Updated successfully', 'product' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found']);
        }
        $product->delete();
        return response()->json([
            'status' => 200, 'message' => 'Deleted successfully'
        ]);
    }

    public function search(Request $request)
    {
        $searchQuery =  $request->get('query') != "all" ? $request->get('query') : '';
        $priceMin = $request->priceMin != "all" ? $request->priceMin : '';
        $priceMax = $request->priceMax != "all" ? $request->priceMax : '';
        $rating = $request->rating != "all" ? $request->rating : '';
        $category = $request->selectCate ?  $request->selectCate : [];
        $brand = $request->selectBrand ? $request->selectBrand : [];
        $page = $request->page ? $request->page : 1;
        $pageSize = $request->pageSize ? $request->pageSize : $this->PAGE_SIZE;
        $order = $request->order ? $request->order : "price";
        $trend = $request->trend ? $request->trend : "desc";

        $products = Product::when($searchQuery != '', function ($query) use ($searchQuery) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        })
            ->when($priceMax != '', function ($query) use ($priceMax, $priceMin) {
                $query->where('price', '>=', $priceMin)->where('price', '<=', $priceMax);
            })
            ->when(!empty($category), function ($query) use ($category) {
                $query->whereIn('cate_id', $category);
            })
            ->when(!empty($brand), function ($query) use ($brand) {
                $query->whereIn('brand_id', $brand);
            })
            ->when($rating != '', function ($query) use ($rating) {
                $query->where('rating', '>=', $rating);
            })

            ->orderBy($order, $trend)
            //->toSql();
            //->select('id', 'name', 'price', 'stock', 'rating', 'numReviews', 'image', 'cate_id', 'brand_id')
            ->paginate($pageSize, ['id', 'name', 'price', 'stock', 'rating', 'numReviews', 'image', 'cate_id', 'brand_id'], 'page', $page);

        return response()->json([
            'status' => 200,
            'message' => 'Search successfully',
            'products' => $products,
        ]);
    }

    public function findSlug($slug)
    {
        $product = Product::where('slug', $slug)->first();
        if (!$product)
            return response()->json(['status' => 404, 'message' => 'Product not found']);

        $product->load(['categories.products', 'brands', 'reviews.users', 'product_images']);

        return response()->json(['status' => 200, 'product' => $product]);
    }

    public function relativeProduct($brand_id)
    {
        $product = Product::where('brand_id', $brand_id)->get();
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found']);
        }
        return response()->json(['status' => 200, 'products' => $product]);
    }

    public function updateReview(Request $request)
    {
        $id = $request->input('product_id');

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found']);
        }
        $product->rating = $request->input('rating');
        $product->numReviews = $request->input('numReviews');
        return response()->json(['status' => 200, 'product' => $product]);
    }

    public function updateActive(Request $request, $id)
    {

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found']);
        }

        $product->is_active = $request->input('is_active');

        $product->update();
        $product->load(['categories', 'brands']);

        return response()->json(['status' => 200, 'message' => 'Updated successfully', 'product' => $product]);
    }

    public function createDummyData(Request $request)
    {
        $product = Product::create([
            "name" => "dumydata",
            "slug" => "dumy-data",
            "stock" => 0,
            "price" => 0,
            "screen" => "dumydata",
            "fcam" => 0,
            "bcam" => 0,
            "os" => "dumydata",
            "cpu" => "dumydata",
            "gpu" => "dumydata",
            "ram" => "dumydata",
            "rom" => "dumydata",
            "battery" => 0,
            "weight" => 0,
            "description" => "dumydata",
            "rating" => 0,
            "numReviews" => 0,
            "cate_id" => 1,
            "brand_id" => 1,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Inserted successfully',
            'id' => $product->id,
        ]);
    }
}
