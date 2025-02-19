import axios from 'axios';
import { IShipping } from '@/interfaces/shipping';

interface ICreateShippingResponse {
    status: "success" | "error";
    message: string;
    data?: IShipping;
}

export type Status = "success" | "error";

const createShipping = async (data: IShipping): Promise<ICreateShippingResponse> => {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    if (!URL) {
        throw new Error('Variável de ambiente não configurada');
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        url: URL + `/shipping`,
        method: 'post',
        data: data
    };

    try {
        const response = await axios<IShipping>(config);

        const status: Status = "success";
        return {
            status: status,
            message: "Simulação registrada com sucesso",
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

export default createShipping;