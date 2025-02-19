import { Box, Input} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

interface AddressStepProps {
  address: {
    number: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressStep = ({ address, onChange }: AddressStepProps) => (
  <Box>
    <Field label="Número">
      <Input name="number" value={address.number} onChange={onChange} />
    </Field>
    <Field label={"Rua"}>
      <Input name="street" value={address.street} onChange={onChange} />
    </Field>
    <Field label="CEP">
      <Input name="zipCode" value={address.zipCode} onChange={onChange} />
    </Field>
    <Field label="Cidade">
      <Input name="city" value={address.city} onChange={onChange} />
    </Field>
    <Field label="Estado">
      <Input name="state" value={address.state} onChange={onChange} />
    </Field>
    <Field label="País">
      <Input name="country" value={address.country} onChange={onChange} />
    </Field>
  </Box>
);