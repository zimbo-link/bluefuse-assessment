<?php
  
namespace App\Http\Controllers;
  
use App\Models\Post;
use Inertia\Inertia;
use App\Models\FileUpload;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
  
class PokemonController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index()
    {
        $pokemons = Pokemon::all();
        return Inertia::render('Pokemon/Index', ['pokemons' => $pokemons, "message"=>""]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function create()
    {
        return Inertia::render('Pokemon/Create');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'body' => ['required'],
        ])->validate();
  
        Pokemon::create($request->all());
  
        return redirect()->route('pokemons.index');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function edit(Pokemon $pokemon)
    {
        return Inertia::render('Pokemon/Edit', [
            'pokemon' => $pokemon
        ]);
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required'],
            'weight' => ['required'],
            'height' => ['required'],
        ])->validate();
  
        Pokemon::find($id)->update($request->all());
        return redirect()->route('pokemons.index');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function destroy($id)
    {
        Pokemon::find($id)->delete();
        return redirect()->route('pokemons.index');
    }

    private function processFile($path){
        $count = 0;
        
        $file = fopen($path, 'r');
        while (($line = fgetcsv($file)) !== false) {
            if ($count > 0) {
                $pokemon = [
                    "name" => $line[0],
                    "weight" => $line[1],
                    "height" => $line[2]
                ];
                Pokemon::create($pokemon);
            }
            $count++;
        }
    }

    public function upload(Request $request)
    {
            $rules = array(
                'attachment' => 'required|mimes:csv|max:1000',
            );
            $messages = array(
                'attachment' => 'CSV file is required.',
            );

            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->route('pokemons.index')->withErrors($validator);
            } else {
                $fileName = time() . '.' . $request->attachment->extension();
                $path = $request->attachment->move(public_path('storage/attachment/'), $fileName);
                $this->processFile('storage/attachment/'.$fileName);
                 
                $upload['file_name'] = $fileName;
                $upload['file_path_location'] = $path;
                FileUpload::create($upload);
                return redirect()->route('pokemons.index');
            }

    }
}