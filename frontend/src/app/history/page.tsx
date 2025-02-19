"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation'
import findAllShippingsByEmail from '@/services/api/shipping/findAllByEmail';
import { IShipping } from '@/interfaces/shipping';


const HistoryPage: React.FC = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const [shippings, setShippings] = useState<IShipping[]>([])

    useEffect(() => {
        fetchShippings()
    }, [])

    const fetchShippings = async () => {
        const response = await findAllShippingsByEmail(email)

        if(response || response.status == "success"){
            setShippings(response.data)
        }
    }
    return (
        <div>
            <h1>History for {email}</h1>
            <p>
                <Button colorScheme="blue">Simular</Button>
            </p>

            {
                JSON.stringify(shippings.length)
            }
        </div>
    );
};

export default HistoryPage;