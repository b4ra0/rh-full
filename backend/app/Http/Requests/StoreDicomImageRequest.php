<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDicomImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "file_path" => 'required|file'
        ];
    }

    public function messages()
    {
        return [
            "file_path.required" => "Você deve anexar um arquivo",
            "file_path.file" => "Arquivo inválido"
        ];
    }
}
