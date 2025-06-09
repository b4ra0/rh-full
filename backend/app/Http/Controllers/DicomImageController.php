<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDicomImageRequest;
use App\Http\Requests\UpdateDicomImageRequest;
use App\Models\DicomImage;
use Illuminate\Http\Request;

class DicomImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dicomImages = DicomImage::all();
        return response()->json($dicomImages);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDicomImageRequest $request)
    {
        $data = $request->validated();
        $dicomImage = DicomImage::create($data);
        $dicomImage->save();
        return response()->json($dicomImage, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = DicomImage::find($id);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDicomImageRequest $request, string $id)
    {
        $data = $request->validated();
        $dicomImage = DicomImage::find($id);
        $dicomImage->update($data);
        $dicomImage->save();
        return response()->json($dicomImage, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dicomImage = DicomImage::find($id);
        $dicomImage->delete();
        return response()->json('Exame deletado com sucesso', 204);
    }
}
