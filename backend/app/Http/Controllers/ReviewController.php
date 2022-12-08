<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Product;

class ReviewController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reviews = Review::all();
        return response()->json([
            'status' => 200,
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReviewRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReviewRequest $request)
    {
        $product_id = $request->input('product_id');
        $user_id = $request->input('user_id');
        // $product = Product::find($product_id);
        // if (!$product)
        //     return response()->json(['status' => 404, 'message' => 'Product not found']);

        // $reviews = Review::where("product_id", "=", $product_id);

        // $product->numReviews += 1;
        // $product->numReviews += 1;

        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found']);
        }

        $existReview = Review::where('product_id', '=', $product_id)->where('user_id', '=', $user_id)->get();

        if (!$existReview) {
            return response()->json(['status' => 404, 'message' => 'This user have aldready submit review', 'review' => $existReview]);
        }

        $review = Review::create([
            'product_id' => $product_id,
            'user_id' => $user_id,
            'comment' => $request->input('comment'),
            'rating' => $request->input('rating'),
        ]);

        $product->rating = $request->input('newRating');
        $product->numReviews = $request->input('newNumReviews');
        $product->update();

        $product->load(['brands', 'categories.products', 'reviews.users', 'product_images']);
        // $review = Review::create($request->all());
        return response()->json(['status' => 200, "message" => "Inserted successfully", "product" => $product]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Review = Review::find($id);
        if (!$Review)
            return response()->json(['status' => 404, 'message' => 'Review not found']);

        return response()->json(['Review' => $Review]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReviewRequest  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReviewRequest $request, $id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['status' => 404, 'message' => 'Review not found']);
        }

        $review->update($request->all());
        return response()->json(['status' => 200, 'message' => 'Updated successfully', 'review' => $review]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['status' => 404, 'message' => 'Review not found']);
        }
        $review->delete();
        return response()->json([
            'status' => 200, 'message' => 'Deleted successfully'
        ]);
    }
}
