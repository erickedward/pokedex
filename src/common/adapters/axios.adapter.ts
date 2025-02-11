import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter{
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await axios
            .get<T>(url)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                // manejar el error
                console.log(error);
                throw new InternalServerErrorException(
                    `No es posible realizar la operación`,
                );
            });
            return data
        } catch (error) {
            throw new InternalServerErrorException(
                `No es posible realizar la operación`,
            );
        }
    }

}