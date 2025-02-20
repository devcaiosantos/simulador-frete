import { Container, OperatorName } from "./style"
import { IOperator } from "@/interfaces/operator"
import { CheapestHighlight, FastestHighlight } from "./style";
import { LuRocket, LuPercent } from "react-icons/lu";

interface IOperatorInfoCardProps {
    operator: IOperator;
    cheapestId: string;
    fastestId: string;
}
export const OperatorInfoCard = ({cheapestId, fastestId, operator}: IOperatorInfoCardProps) => {

    return (
        <Container>
            <OperatorName>{operator.name}</OperatorName>
            <p>Preço: R$ {operator.price}</p>
            <p>Prazo de entrega: {operator.deliveryTime} dia(s)</p>
            
            {cheapestId === JSON.stringify(operator.id) && (
                <CheapestHighlight>
                  <LuPercent/>  Opção mais barata
                </CheapestHighlight>
            )}
            {fastestId === JSON.stringify(operator.id) && (
                <FastestHighlight>
                    <LuRocket/>  Opção mais rápida
                </FastestHighlight>
            )}
        </Container>
    )
}