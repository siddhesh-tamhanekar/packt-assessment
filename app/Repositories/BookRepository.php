<?php
namespace App\Repositories;

use Illuminate\Support\Facades\Http;
use \App\Repositories\Contracts\IBookRepository;

class BookRepository implements IBookRepository {
    const RESPONSE_CACHE_SECONDS = 60 * 60;
    const PACKT_API_URL = 'https://api.packt.com/api/v1';

    public function fetchBooks($intPage = 1) {
        
        return cache()->remember('books/page/' . $intPage, self::RESPONSE_CACHE_SECONDS, function () use($intPage) {
            $strUrl = self::PACKT_API_URL . '/products?token=' . config('app.packt_api_token') . '&limit=12&page=' . $intPage;
            $arrmixResponse = Http::get($strUrl)->json();
            if(isset($arrmixResponse['errorMessage'])) {
                return $arrmixResponse;
            }
    
            return [
                'current_page' => $arrmixResponse['current_page'],
                'last_page' =>  $arrmixResponse['last_page'],
                'products' => $arrmixResponse['products'],
            ];
        });
    }
    
    public function fetchBook($intId) {
        
        return cache()->remember('books/' . $intId, self::RESPONSE_CACHE_SECONDS, function() use($intId) {
            $strUrl = self::PACKT_API_URL . '/products//' . $intId . '/?token=' . config('app.packt_api_token'); 
            $arrmixResponse = Http::get($strUrl)->json();
            if(isset($arrmixResponse['errorMessage'])) {
                return $arrmixResponse;
            }
            $strUrl = self::PACKT_API_URL . '/products//' . $intId . '/price/INR?token=' . config('app.packt_api_token'); 
            $arrmixPricingResponse = Http::get($strUrl)->json();
    
            return [
                'product' => $arrmixResponse,
                'pricing' =>  $arrmixPricingResponse,
            ];
        });
    }

    public function fetchBookImage( $intId ) {
        return cache()->remember('books/' . $intId . '/image', self::RESPONSE_CACHE_SECONDS, function() use($intId) {
            $strUrl = self::PACKT_API_URL . '/products//' . $intId . '/cover/small?token=' . config('app.packt_api_token');
            $objResponse = Http::get($strUrl);
            if($objResponse->json()) {
                return null;
            }

            return [
                'contentType' => $objResponse->getHeader('Content-Type')[0],
                'image' => $objResponse->body()
            ];
        });  
    }
}