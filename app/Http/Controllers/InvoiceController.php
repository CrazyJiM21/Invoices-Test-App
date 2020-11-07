<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Invoice;

class InvoiceController extends Controller
{
    public function invoice(String $hash = '')
    {
        if (!$hash) abort(404);
        $invoice = Invoice::where('link', $hash)->firstOrFail();
        return view('invoice', ['invoice' => $invoice]);
    }
}
