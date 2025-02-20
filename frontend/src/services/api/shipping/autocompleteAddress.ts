import axios from 'axios';
import { IAddress } from '@/interfaces/address';

interface IAutocompleteAddressResponse {
    status: "success" | "error";
    message: string;
    data?: IAddress;
}

export type Status = "success" | "error";

const autocompleteAddress = async (address:string): Promise<IAutocompleteAddressResponse> => {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    if (!URL) {
        throw new Error('Variável de ambiente não configurada');
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        url: URL + `/shipping/autocomplete-address/${address}`,
        method: 'get',
    };

    try {
        const response = await axios<IAddress>(config);

        const status: Status = "success";
        return {
            status: status,
            message: "Endereço encontrado",
            data: response.data
        };
    } catch (error) {
        let message = "Uma falha inesperada ocorreu";

        if (error instanceof Error) {
            message = error.message;
        }

        if (axios.isAxiosError(error)) {
            message = error.response?.data.message || "O servidor pode estar fora do ar, tente novamente mais tarde";
        }

        const status: Status = "error";
        return {
            status: status,
            message: message
        };
    }
};

export default autocompleteAddress;