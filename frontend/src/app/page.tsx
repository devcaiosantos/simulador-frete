"use client";
import { Field } from '@/components/ui/field';
import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    window.location.href = `/history?email=${email}`
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field label={"E-mail"}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Button type="submit">Acessar</Button>
      </form>
    </div>
  );
};

export default EmailForm;