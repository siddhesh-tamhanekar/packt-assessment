<?php

namespace App\Http\Controllers;

class BooksController extends Controller {
    public function index(\App\Repositories\Contracts\IBookRepository $objBookRepository) {
        $intPage = request('page' , 1);
        return $objBookRepository->fetchBooks($intPage);
    }

    public function image($intId, \App\Repositories\Contracts\IBookRepository $objBookRepository) {
        
        $objImageResponse =  $objBookRepository->fetchBookImage($intId);
        if( true == is_null($objImageResponse) ) {
            abort(404);
        }
        return response($objImageResponse['image'])->header('Content-Type', $objImageResponse['contentType']);
         
    }

    public function view($intId, \App\Repositories\Contracts\IBookRepository $objBookRepository) {
        return $objBookRepository->fetchBook($intId);
    }
}