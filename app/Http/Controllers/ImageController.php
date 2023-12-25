<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    public function process(Request $request)
    {
        $image = $request->file('image');

        // Load the uploaded image using Intervention Image
        $img = Image::make($image);

        // Example: Replace a placeholder text with provided data
        $placeholderText = '<<NAME>>';
        $textToReplace = 'Joseph';
        // $data = $request->input('placeholderData');
        // $textToReplace = $data['name'];

        // Replace the placeholder text in the image
        $img->text($textToReplace, 100, 100, function ($font) use ($placeholderText) {
            // $font->file(public_path('path/to/your/font.ttf'));
            $font->size(24);
            $font->color('#ffffff');
            $font->align('left');
            $font->valign('top');
        });

        $processedImage = Image::make($img)->encode('data-url');

        return response()->json(['data' => $processedImage]);
    }

}
