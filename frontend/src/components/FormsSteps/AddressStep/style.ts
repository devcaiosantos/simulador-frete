import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const NumberStreetContainer = styled(Flex)`
  gap: 10px;
  width: 100%;

  & > :first-child {
    width: 30%;
    input {
        width: 100%;
    }
  }

  & > :last-child {
    width: 70%;
    input {
        width: 100%;
    }
  }
`;

export const CityStateContainer = styled(Flex)`
  gap: 10px;
  width: 100%;

  & > :first-child {
    width: 70%;
    input {
        width: 100%;
    }
  }

  & > :last-child {
    width: 30%;
    input {
        width: 100%;
    }
  }
`;