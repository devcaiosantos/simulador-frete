"use client";
import { useState, Suspense } from "react"; // Import Suspense
import createShipping from "@/services/api/shipping/createShipping";
import autocompleteAddress from "@/services/api/shipping/autocompleteAddress";
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
import { LuListCheck, LuPackageCheck, LuTruck } from "react-icons/lu";
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
    height: Yup.number().min(
      1,
      'Altura deve ser maior que 0'
    ).required('Altura é obrigatória'),
    width: Yup.number().min(
      1,
      'Largura deve ser maior que 0'
    )
    .required('Largura é obrigatória'),
    length: Yup.number().min(
      1,
      'Comprimento deve ser maior que 0'
    ).required('Comprimento é obrigatório'),
  });

const initialValues = {
  pickupAddress: {
    number: 0,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  deliveryAddress: {
    number: 0,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  productDetails:{
    name: "",
    height: 0,
    width: 0,
    length: 0,
  }
};

function FormsPage() {
  const searchParams = useSearchParams()
  const userEmail = searchParams.get('email')
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingSimulation, setShippingSimulation] = useState<IShippingSimulation>(null);
  const [error, setError] = useState(null);

  const nextStep = () => setStep(step + 1);

  const handleChange = (e,stepName) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if((["height","width","length","number"].includes(name))){
      formattedValue = formatNumber(value);
    }
    if(name=="zipCode"){
      formattedValue = formatZipCode(value);
      if(formattedValue.length === 9)autofillAddress(formattedValue,stepName);
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

  const formatZipCode = (value: string) => {
    if(value.length > 9){
      return value.slice(0,9);
    }

    return value.replace(/\D/g, '')
    .replace(/(\d{5})(\d{3})/, "$1-$2");
  }

  const autofillAddress = async (address: string, stepName:string) => {
    const response = await autocompleteAddress(address);
    if(response.status === "success"){
      const formattedAddress = {
        city: response.data.city,
        state: response.data.state,
        country: response.data.country,
      }
      setFormData((prev) => ({
        ...prev,
        [stepName]: {
          ...prev[stepName],
          ...formattedAddress,
        },
      }));
    }
  }

  const handleNextStep = async (newStep:number) => {
    if(newStep < step){
      setError(null);
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
    if(response && response.status === "error"){
      setError(response.message);
      setIsLoading(false);
    };

    if(response && response.status === "success"){
      setTimeout(() => {
        setShippingSimulation(response.data);
        setIsLoading(false);
      }, 2000);
    }
  };
  
  return (
    <Container>
      <HeaderForm>
        <BackToHistory href={`/history?email=${userEmail}`}>
          Ver histórico
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
              <StepsItem index={1} icon={<LuTruck/>} title="Endereço de Coleta" />
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
                error && !isLoading && (
                  <p>Não foi possível fazer a simulação, revise os endereços</p>
                )
              }

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
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormsPage />
    </Suspense>
  );
}