<?php

use App\Http\Controllers\DicomImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('dicom-images', DicomImageController::class);
