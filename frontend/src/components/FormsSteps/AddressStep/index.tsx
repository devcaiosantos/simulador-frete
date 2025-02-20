import { Input } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { InputsContainer } from '../style';
import { NumberStreetContainer, CityStateContainer } from './style';
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
        {formErrors.number && <span>{formErrors.number}</span>}
      </Field>
      <Field label="Rua">
        <Input name="street" value={address.street} onChange={onChange} />
        {formErrors.street && <span>{formErrors.street}</span>}
      </Field>
    </NumberStreetContainer>
    
    <Field label="CEP">
      <Input name="zipCode" value={address.zipCode} onChange={onChange} />
      {formErrors.zipCode && <span>{formErrors.zipCode}</span>}
    </Field>

    <CityStateContainer>
      <Field label="Cidade">
        <Input name="city" value={address.city} onChange={onChange} />
        {formErrors.city && <span>{formErrors.city}</span>}
      </Field>
      <Field label="Estado">
        <Input name="state" value={address.state} onChange={onChange} />
        {formErrors.state && <span>{formErrors.state}</span>}
      </Field>
    </CityStateContainer>
    <Field label="País">
      <Input name="country" value={address.country} onChange={onChange} />
      {formErrors.country && <span>{formErrors.country}</span>}
    </Field>
  </InputsContainer>
);