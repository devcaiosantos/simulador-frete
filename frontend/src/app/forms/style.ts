import { Flex } from "@chakra-ui/react";
import styled from "styled-components";
import theme from "@/theme";

export const Container = styled(Flex)`
    min-height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const HeaderForm = styled(Flex)`
    position: relative;
    justify-content: center;
    align-items: center;
    width: 1000px;
    margin-bottom: 1rem;
`;

export const BackToHistory = styled.a`
    position: absolute;
    left: 0;
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    &:hover {
        text-decoration: underline;
    }
`;
export const FormTitle = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    color: ${theme.colors.primary};
`;

export const FormContainer = styled(Flex)`
    gap: 2rem;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    width: 1000px;
    height: max-content;
    max-height: calc(100vh - 4rem);
    background-color: ${theme.colors.light};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const StepTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${theme.colors.dark};
`;