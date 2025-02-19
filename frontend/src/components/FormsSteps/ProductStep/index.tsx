import { Box, Input } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

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
  <Box>
    <Field label="Nome do Produto">
      <Input name="name" value={productDetails.name} onChange={onChange} />
        {formErrors.name && <span>{formErrors.name}</span>}
    </Field>

    <Field label="Altura (cm)">
        <Input name="height" value={productDetails.height} onChange={onChange} />
        {formErrors.height && <span>{formErrors.height}</span>}
    </Field>

    <Field label="Largura (cm)">
        <Input name="width" value={productDetails.width} onChange={onChange} />
        {formErrors.width && <span>{formErrors.width}</span>}
    </Field>

    <Field label="Comprimento (cm)">
        <Input name="length" value={productDetails.length} onChange={onChange} />
        {formErrors.length && <span>{formErrors.length}</span>}
    </Field>
  </Box>
);