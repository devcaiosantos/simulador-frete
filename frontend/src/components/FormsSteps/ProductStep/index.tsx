import { Input } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { InputsContainer, ErrorText } from '../style';

interface ProductStepProps {
    productDetails: {
        name: string;
        height: number;
        width: number;
        length: number;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formErrors: Record<string, string>;
}


export const ProductStep = ({ productDetails, formErrors, onChange }: ProductStepProps) => (
  <InputsContainer>
    <Field label="Nome do Produto">
      <Input name="name" value={productDetails.name} onChange={onChange} />
      <ErrorText>{formErrors.name && <span>{formErrors.name}</span>}</ErrorText>
    </Field>

    <Field label="Altura (cm)">
        <Input name="height" value={productDetails.height} onChange={onChange} />
        <ErrorText>{formErrors.height && <span>{formErrors.height}</span>}</ErrorText>
    </Field>

    <Field label="Largura (cm)">
        <Input name="width" value={productDetails.width} onChange={onChange} />
        <ErrorText>{formErrors.width && <span>{formErrors.width}</span>}</ErrorText>
    </Field>

    <Field label="Comprimento (cm)">
        <Input name="length" value={productDetails.length} onChange={onChange} />
        <ErrorText>{formErrors.length && <span>{formErrors.length}</span>}</ErrorText>
    </Field>
  </InputsContainer>
);