import { Input } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { InputsContainer } from '../style';
import { NumberStreetContainer, CityStateContainer } from './style';
import { ErrorText } from '../style';

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
  <InputsContainer>
    <NumberStreetContainer>
      <Field label="Número">
        <Input name="number" value={address.number} onChange={onChange} />
        <ErrorText>{formErrors.number && <span>{formErrors.number}</span>}</ErrorText>
      </Field>
      <Field label="Rua">
        <Input name="street" value={address.street} onChange={onChange} />
        <ErrorText>{formErrors.street && <span>{formErrors.street}</span>}</ErrorText>
      </Field>
    </NumberStreetContainer>
    
    <Field label="CEP">
      <Input name="zipCode" value={address.zipCode} onChange={onChange} />
      <ErrorText>{formErrors.zipCode && <span>{formErrors.zipCode}</span>}</ErrorText>
    </Field>

    <CityStateContainer>
      <Field label="Cidade">
        <Input name="city" value={address.city} onChange={onChange} />
        <ErrorText>{formErrors.city && <span>{formErrors.city}</span>}</ErrorText>
      </Field>
      <Field label="Estado">
        <Input name="state" value={address.state} onChange={onChange} />
        <ErrorText>{formErrors.state && <span>{formErrors.state}</span>}</ErrorText>
      </Field>
    </CityStateContainer>
    <Field label="País">
      <Input name="country" value={address.country} onChange={onChange} />
      <ErrorText>{formErrors.country && <span>{formErrors.country}</span>}</ErrorText>
    </Field>
  </InputsContainer>
);