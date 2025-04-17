<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InscriptionController extends Controller
{
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nom' => 'required',
        'prenom' => 'required',
        'contact' => 'required|numeric',
        'formation' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    Inscription::create($request->all());

    return response()->json(['message' => 'Inscription réussie'], 201);
}
}
