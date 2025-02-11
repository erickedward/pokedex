import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { PokemonInsert } from './interfaces/pokemon.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {
    
  }
  
  async executeSeed() {
    
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    let pokemonToInsert: PokemonInsert[] = [];
    if (data.results.length>0){
      await this.pokemonModel.deleteMany({});
    }
    data.results.forEach(({name, url}) =>{
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      pokemonToInsert.push({
        no:no,
        name:name
      });
    });
    console.log("pokemonToInsert",pokemonToInsert)
    await this.pokemonModel.insertMany(pokemonToInsert);
    return `Se insertaron ${pokemonToInsert.length} registros`;
  }
}
