import theme from "@/theme";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Flex)`
    flex-direction: column;
    gap: 1rem;
    width: max-content;
    border: 1px solid ${theme.colors.border};
    padding: 1rem;
    background-color: ${theme.colors.background};
    border-radius: 10px;
`;

export const OperatorName = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${theme.colors.dark};
`;

export const HighLight = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: max-content;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    font-weight: 500;
    font-size: 1.1rem;
`
export const CheapestHighlight = styled(HighLight)`
    color: ${theme.colors.light};
    background-color: ${theme.colors.success};
`;

export const FastestHighlight = styled(HighLight)`
    color: ${theme.colors.light};
    background-color: ${theme.colors.warning};
`;



