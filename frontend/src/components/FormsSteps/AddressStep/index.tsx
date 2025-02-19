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
  formErrors: Record<string, string>;
}

export const AddressStep = ({ address, onChange, formErrors }: AddressStepProps) => (
  <Box>
    <Field label="Número">
      <Input name="number" value={address.number} onChange={onChange} />
      {formErrors.number && <span>{formErrors.number}</span>}
    </Field>
    <Field label={"Rua"}>
      <Input name="street" value={address.street} onChange={onChange} />
      {formErrors.street && <span>{formErrors.street}</span>}
    </Field>
    <Field label="CEP">
      <Input name="zipCode" value={address.zipCode} onChange={onChange} />
      {formErrors.zipCode && <span>{formErrors.zipCode}</span>}
    </Field>
    <Field label="Cidade">
      <Input name="city" value={address.city} onChange={onChange} />
      {formErrors.city && <span>{formErrors.city}</span>}
    </Field>
    <Field label="Estado">
      <Input name="state" value={address.state} onChange={onChange} />
      {formErrors.state && <span>{formErrors.state}</span>}
    </Field>
    <Field label="País">
      <Input name="country" value={address.country} onChange={onChange} />
      {formErrors.country && <span>{formErrors.country}</span>}
    </Field>
  </Box>
);