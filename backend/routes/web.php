<?php

use App\Http\Controllers\DicomImageController;
use Illuminate\Support\Facades\Route;

Route::resource('dicom-images', DicomImageController::class);
