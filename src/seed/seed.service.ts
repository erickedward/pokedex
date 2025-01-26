import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  //private readonly axios: AxiosInstance
  async executeSeed() {
    

    try {
      const data = await axios
      .get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1')
      .then(function (response) {
        return response.data.results;
      })
      .catch(function (error) {
        // manejar el error
        console.log(error);
        throw new InternalServerErrorException(`No es posible realizar la operación`)
      })
      

      data.forEach(({name, url}) =>{
        const segments = url.split('/');
        const no:number = +segments[segments.length - 2];
        console.log({name, no})
      }) 

      return data;
    } catch (error) {
      throw new InternalServerErrorException(`No es posible realizar la operación`)
    }

    
  }
}
