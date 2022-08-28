<?php
namespace App\Repositories\Contracts;

interface IBookRepository {
    public function fetchBooks($intPage=1);
    public function fetchBookImage($intId);
    public function fetchBook($intId);
}