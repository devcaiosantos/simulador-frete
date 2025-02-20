"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import findAllShippingsByEmail from '@/services/api/shipping/findAllByEmail';
import { IShippingSimulation } from '@/interfaces/shippingSimulation';
import { toaster } from "@/components/ui/toaster"
import { BackToHome, Container, HistoryContainer, HistoryItem, ShippingInfo, TitlePage } from './style';
import { NewSimulationButton } from './style';

const HistoryPage: React.FC = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [shippings, setShippings] = useState<IShippingSimulation[]>([]);

    useEffect(() => {
        const fetchShippings = async () => {
            
            const response = await findAllShippingsByEmail(email);
            if(response && response.status === "error") {
                toaster.create({
                    title: "Não foi possível encontrar fretes",
                    type: "warning",
                });
            }
            if (response && response.status === "success") {
                setShippings(response.data);
            }
        };
        fetchShippings();
    }, [email]);

    return (
    <Container>
      <TitlePage>Histórico de Simulações - {email}</TitlePage>
    
      <NewSimulationButton onClick={()=>window.location.href=`/forms?${email}`}>
        Nova Simulação
      </NewSimulationButton>
      {email && (
        <ShippingInfo>
            <BackToHome href="/">
                Alterar E-mail
            </BackToHome>
            <p>
                <strong>E-mail:</strong> {email}
            </p>
        </ShippingInfo>
      )}

      <HistoryContainer>
        {shippings.length === 0 ? (
          <p>Nenhuma simulação encontrada.</p>
        ) : (
          shippings.map((shipping) => (
            <HistoryItem key={shipping.id}>
              <div className="product-name">{shipping.productName}</div>
              <div className="dimensions">
                <strong>Dimensões:</strong> {shipping.height} x {shipping.width} x {shipping.length}
              </div>
              <div className="distance">
                <strong>Distância:</strong> {shipping.distance} km
              </div>
              <div className="operator">
                <strong>Operadora mais barata:</strong> 
                {shipping.cheapestOperatorId.name} - ${shipping.cheapestOperatorId.price} - {shipping.cheapestOperatorId.deliveryTime} dia(s)
              </div>
              <div className="operator">
                <strong>Operadora mais rápida:</strong> 
                {shipping.fastestOperatorId.name} - ${shipping.fastestOperatorId.price} - {shipping.fastestOperatorId.deliveryTime} dia(s)
              </div>
            </HistoryItem>
          ))
        )}
      </HistoryContainer>
    </Container>
    );
};

export default HistoryPage;