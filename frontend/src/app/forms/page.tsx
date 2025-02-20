"use client";
import { useState } from "react";
import createShipping from "@/services/api/shipping/createShipping";
import { useSearchParams } from "next/navigation";
import { AddressStep } from "@/components/FormsSteps/AddressStep";
import { ProductStep } from "@/components/FormsSteps/ProductStep";

import { Button, Group } from "@chakra-ui/react";
import * as Yup from 'yup';

import { BackToHistory, Container, FormContainer, FormTitle, HeaderForm } from "./style";

import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "@/components/ui/steps"
import {
  Skeleton,
} from "@/components/ui/skeleton"
import { LuListCheck, LuPackage, LuPackageCheck } from "react-icons/lu";
import { IShippingSimulation } from "@/interfaces/shippingSimulation";
import { ShippingSimulation } from "@/components/ShippingSimulation";


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
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingSimulation, setShippingSimulation] = useState<IShippingSimulation>(null);

  const nextStep = () => setStep(step + 1);

  const handleChange = (e,stepName) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if((["height","width","length","number"].includes(name))){
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

  const handleNextStep = async (newStep) => {
    if(newStep < step){
      setFormErrors({});
      setStep(newStep);
      return;
    }
    
    try{
      if(step === 0){
        await productDetails.validate(formData.productDetails , {abortEarly: false})
        setFormErrors({});
        nextStep();
      }
      if(step === 1){
        await addressSchema.validate(formData.pickupAddress , {abortEarly: false})
        setFormErrors({});
        nextStep();
      }
      if(step === 2){
        await addressSchema.validate(formData.deliveryAddress , {abortEarly: false})
        setFormErrors({});
        nextStep();
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
    setIsLoading(true);
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
    const response = await createShipping(formattedData);

    if(response && response.status === "success"){
      setTimeout(() => {
        setIsLoading(false);
        setShippingSimulation(response.data)
      }, 2000);
    }
  };
  
  return (
    <Container>
      <HeaderForm>
        <BackToHistory href={`/history?email=${userEmail}`}>
          Voltar para Histórico
        </BackToHistory>
        <FormTitle>
          Simulação de Frete
        </FormTitle>
      </HeaderForm>
      
      <FormContainer>
      <StepsRoot
            step={step}
            onStepChange={(e)=>handleNextStep(e.step)}
            defaultValue={1}
            count={3}
            colorPalette={"green"}
          >
            <StepsList>
              <StepsItem index={0} icon={<LuListCheck/>} title="Informações do Produto" />
              <StepsItem index={1} icon={<LuPackage/>} title="Endereço de Coleta" />
              <StepsItem index={2} icon={<LuPackageCheck/>} title="Endereço de Entrega" />
            </StepsList>

            <StepsContent index={0}>
              <ProductStep
                productDetails={formData.productDetails}
                formErrors={formErrors}
                onChange={(e) => handleChange(e,'productDetails')}
              />
            </StepsContent>
            <StepsContent index={1}>
              <AddressStep
                address={formData.pickupAddress}
                formErrors={formErrors}
                onChange={(e) => handleChange(e,'pickupAddress')}
              />
            </StepsContent>
            <StepsContent index={2}>
              <AddressStep
                address={formData.deliveryAddress}
                formErrors={formErrors}
                onChange={(e) => handleChange(e,'deliveryAddress')}
              />
            </StepsContent>
            <StepsCompletedContent>
              {
                isLoading && <Skeleton height="200px" />
              }

              {
                shippingSimulation && !isLoading && (
                  ShippingSimulation({simulation: shippingSimulation})
                )
              }
            </StepsCompletedContent>

            <Group>
              <StepsPrevTrigger asChild>
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
              </StepsPrevTrigger>
              <StepsNextTrigger asChild>
                <Button variant="outline" size="sm">
                  {step === 2 ? 'Simular' : 'Próximo'}
                </Button>
              </StepsNextTrigger>
            </Group>
          </StepsRoot>
      </FormContainer>
    </Container>
  )
};