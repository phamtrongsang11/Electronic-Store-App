<?php

namespace App\Http\Controllers;

use App\Models\ReceiveDetail;
use App\Http\Requests\StoreReceiveDetailRequest;
use App\Http\Requests\UpdateReceiveDetailRequest;

class ReceiveDetailController extends Controller
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
     * @param  \App\Http\Requests\StoreReceiveDetailRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReceiveDetailRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReceiveDetail  $receiveDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ReceiveDetail $receiveDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReceiveDetail  $receiveDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ReceiveDetail $receiveDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReceiveDetailRequest  $request
     * @param  \App\Models\ReceiveDetail  $receiveDetail
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReceiveDetailRequest $request, ReceiveDetail $receiveDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReceiveDetail  $receiveDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReceiveDetail $receiveDetail)
    {
        //
    }
}
