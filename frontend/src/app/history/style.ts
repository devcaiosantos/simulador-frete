import styled from 'styled-components';
import theme from '@/theme';
import { Button } from '@chakra-ui/react';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: ${theme.colors.background};
`;

export const TitlePage = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.dark};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ShippingInfo = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: ${theme.colors.light};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1rem;
    color: ${theme.colors.dark700};
    margin: 0.5rem 0;
  }
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HistoryItem = styled.div`
  background-color: ${theme.colors.light};
  padding: 1.5rem;
  border-left: 5px solid ${theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .product-name {
    font-size: 1.25rem;
    font-weight: bold;
    color: ${theme.colors.dark};
  }

  .dimensions {
    font-size: 1rem;
    color: ${theme.colors.dark700};
  }

  .distance {
    font-size: 1rem;
    color: ${theme.colors.dark700};
  }

  .operator {
    font-size: 1rem;
    color: ${theme.colors.dark700};
  }

  .date {
    font-size: 0.9rem;
    color: ${theme.colors.dark600};
  }
`;

export const NewSimulationButton = styled(Button)`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.light};
    font-size: 1rem;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    width: max-content;
`;

export const BackToHome = styled.a`
    color: ${theme.colors.primary};
    font-size: 1.0rem;
    &:hover {
        text-decoration: underline;
    }
`;
