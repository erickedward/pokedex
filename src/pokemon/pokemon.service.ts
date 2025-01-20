import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {  isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel:Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name= createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon  = await this.pokemonModel.create( createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon:Pokemon;
    if (!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ no:term})
    }else{
      if (isValidObjectId(term)){
        pokemon = await this.pokemonModel.findById(term)
      }else{
        pokemon = await this.pokemonModel.findOne({ name:term.toLocaleLowerCase().trim()})
      }
    }
    if (!pokemon)
      throw new NotFoundException(`No se encontro el pokemon ${ term }`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name =  updatePokemonDto.name.toLocaleLowerCase();
   

    try {
      await pokemon.updateOne(updatePokemonDto, {new:true})

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
      
    }
    
  }

  async remove(id: string) {
    //return await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } =  await this.pokemonModel.deleteOne({ _id:id });
    if (deletedCount === 0)
      throw new BadRequestException(`El id del pokemon no existe`)
    return;
  }

  private handleExceptions(error: any){
    switch(error.code){
      case 11000:
        throw new BadRequestException(`Pokemon existe en la Bd ${ JSON.stringify( error.keyValue) }`)
      break;
      default:
        console.log(error)
        throw new InternalServerErrorException(`No es posible realizar la operación`)
    }
  }
}
