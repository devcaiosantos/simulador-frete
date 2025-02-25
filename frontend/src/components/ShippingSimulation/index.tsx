import { IShippingSimulation } from "@/interfaces/shippingSimulation"
import { Container, InfoText, OperatorsContainer } from "./style"
import { IAddress } from "@/interfaces/address"
import { OperatorInfoCard } from "../OperatorInfoCard"

interface ShippingSimulationProps {
    simulation: IShippingSimulation;
}
export const ShippingSimulation = ({simulation}: ShippingSimulationProps) => {

    function fullAddress(address: IAddress){
        return `${address.street}, ${address.number}, ${address.city} - ${address.state}, ${address.zipCode} ${address.country}`
    }

    return (
        <Container>
            <InfoText>
                <strong>Produto:</strong> {simulation.productName}
            </InfoText>
            <InfoText>
                <strong>Endereço de Coleta:</strong> {fullAddress(simulation.pickupAddressId)}
            </InfoText>

            <InfoText>
                <strong>Endereço de Entrega:</strong> {fullAddress(simulation.deliveryAddressId)}
            </InfoText>
            <InfoText>
                <strong>Distância:</strong> {Math.ceil(simulation.distance)} km
            </InfoText>

            <OperatorsContainer>
                <OperatorInfoCard
                    operator={simulation.cheapestOperatorId} 
                    cheapestId={JSON.stringify(simulation.cheapestOperatorId.id)}
                    fastestId={JSON.stringify(simulation.fastestOperatorId.id)}
                />
                
                <OperatorInfoCard 
                    operator={simulation.fastestOperatorId}
                    cheapestId={JSON.stringify(simulation.cheapestOperatorId.id)}
                    fastestId={JSON.stringify(simulation.fastestOperatorId.id)}
                />
            
            </OperatorsContainer>
            
        </Container>
    )
}