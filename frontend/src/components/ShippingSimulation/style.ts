import theme from "@/theme";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Flex)`
    padding: 1rem 0;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const InfoText = styled.h1`
    font-size: 1.0rem;
    font-weight: 500;
    color: ${theme.colors.dark};
`;

export const OperatorsContainer = styled(Flex)`
    gap: 1rem;
    width: 100%;
    justify-content: center;
`;


