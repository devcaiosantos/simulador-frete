import { Flex } from "@chakra-ui/react";
import styled from "styled-components";
import theme from "@/theme";
export const InputsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const ErrorText = styled.span`
  color: ${theme.colors.danger};
  font-size: 0.8rem;
`;

