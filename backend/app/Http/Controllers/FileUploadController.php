<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Cloudder;
use DB;


class FileUploadController extends Controller
{
    public function showUpLoadForm()
    {
        return view('cloudinary.upload');
    }

    public function storeUploads(Request $request)
    {
        $response = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath();
        // dd($response);
        // return back()
        //     ->with('success', 'File uploaded successfully');

        return response()->json([
            'status' => 200,
            'message' => 'Upload successfully',
            'path' => $response
        ]);
    }
}
