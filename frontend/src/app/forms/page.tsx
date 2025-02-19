"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AddressStep } from "@/components/FormsSteps/AddressStep";
import { ProductStep } from "@/components/FormsSteps/ProductStep";
import { Box, Button, Flex } from "@chakra-ui/react";
import * as Yup from 'yup';
import createShipping from "@/services/api/shipping/createShipping";

const addressSchema = Yup.object({
    number: Yup.number().required('Número é obrigatório'),
    street: Yup.string().required('Rua é obrigatória'),
    city: Yup.string().required('Cidade é obrigatória'),
    state: Yup.string().required('Estado é obrigatório'),
    zipCode: Yup.string().required('CEP é obrigatório'),
    country: Yup.string().required('País é obrigatório'),
  });

const productDetails = Yup.object({
    name: Yup.string().required('Nome do produto é obrigatório'),
    height: Yup.number().required('Altura é obrigatória'),
    width: Yup.number().required('Largura é obrigatória'),
    length: Yup.number().required('Comprimento é obrigatório'),
  });

const initialValues = {
  pickupAddress: {
    number: 103,
    street: "Rua dos Crisântemos",
    city: "Campo Mourão",
    state: "Paraná",
    zipCode: "87308170",
    country: "Brasil",
  },
  deliveryAddress: {
    number: 103,
    street: "Rua dos Crisântemos",
    city: "Campo Mourão",
    state: "Paraná",
    zipCode: "87308170",
    country: "Brasil",
  },
  productDetails:{
    name: "Caixa Z",
    height: 100,
    width: 100,
    length: 100,
  }
};


export default function Page(){
  const searchParams = useSearchParams()
  const userEmail = searchParams.get('email')
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e,stepName) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if((["height","width","length","zipCode","number"].includes(name))){
      formattedValue = formatNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [stepName]: {
        ...prev[stepName],
        [name]: formattedValue,
      },
    }));
  }

  const formatNumber = (value: string) => {
    return Number(value.replace(/\D/g, ''));
  }

  const handleNextStep = async () => {
    try{
      if(step === 1){
        await productDetails.validate(formData.productDetails , {abortEarly: false})
        setFormErrors({});
        nextStep();
      }
      if(step === 2){
        await addressSchema.validate(formData.pickupAddress , {abortEarly: false})
        setFormErrors({});
        nextStep();
      }
      if(step === 3){
        await addressSchema.validate(formData.deliveryAddress , {abortEarly: false})
        setFormErrors({});
        handleSubmit();
      }
      
    } catch(err){
        if (err instanceof Yup.ValidationError) {

          const yupErrors: Yup.ValidationError = err;
          const newErrors: Record<string, string> = {};

          yupErrors.inner.forEach((e) => {
            newErrors[e.path as string] = e.message;
          });

          setFormErrors(newErrors);
        }
    }
    
  }

  const handleSubmit = async () => {
    
    const formattedData = {
      pickupAddress: formData.pickupAddress,
      deliveryAddress: formData.deliveryAddress,
      dimensions: {
        height: formData.productDetails.height,
        width: formData.productDetails.width,
        length: formData.productDetails.length,
      },
      productName: formData.productDetails.name,
      userEmail: userEmail,

    }
    await createShipping(formattedData);
    
    
  };
  

  return (
    <Box>
      {step === 1 && (
        <ProductStep
          productDetails={formData.productDetails}
          formErrors={formErrors}
          onChange={(e) => handleChange(e,'productDetails')}
        />
      )}

      {step === 2 && (
        <AddressStep
          address={formData.pickupAddress}
          formErrors={formErrors}
          onChange={(e) => handleChange(e,'pickupAddress')}
        />
      )}
      {step === 3 && (
        <AddressStep
          address={formData.deliveryAddress}
          formErrors={formErrors}
          onChange={(e) => handleChange(e,'deliveryAddress')}
        />
      )}

      <Flex>
        {step > 1 && <Button onClick={prevStep}>Anterior</Button>}
        {step < 3 && <Button onClick={handleNextStep}>Próximo</Button>}
        {step === 3 && <Button onClick={handleNextStep}>Simular</Button>}
      </Flex>

    </Box>
  )
};