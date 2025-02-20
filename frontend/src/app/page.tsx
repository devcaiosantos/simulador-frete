"use client";
import React, { useState } from "react";
import { Field } from "@/components/ui/field";

import {
  FormContainer,
  FormCard,
  FormTitle,
  StyledInput,
  StyledButton,
} from "./style";



const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    window.location.href = `/forms?email=${email}`;
  };

  return (
    <FormContainer>
      <FormCard>
        <FormTitle>Simulador de Frete</FormTitle>
        <form onSubmit={handleSubmit}>
          <Field label={"E-mail"}>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </Field>
          <StyledButton type="submit">Acessar</StyledButton>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default EmailForm;