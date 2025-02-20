import styled from "styled-components";
import { Button, Flex, Input } from "@chakra-ui/react";
import theme from "@/theme";


export const Wrapper = styled(Flex)`
    min-height: 100vh;
    width: 100%;
    background-color: ${theme.colors.background};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.background};
  padding: 2rem;
`;

export const FormCard = styled.div`
  background-color: ${theme.colors.light};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const FormTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.dark};
  margin-bottom: 1.5rem;
`;

export const StyledInput = styled(Input)`
  background-color: ${theme.colors.light};
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  color: ${theme.colors.dark700};
  margin-bottom: 1rem;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
`;

export const StyledButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.light};
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  &:active {
    background-color: ${theme.colors.primary};
  }
`;