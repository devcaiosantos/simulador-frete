import * as Yup from 'yup';
export const validationSchema = ()=> Yup.object({
  pickupAddress: Yup.object({
    number: Yup.number().required('Número é obrigatório'),
    street: Yup.string().required('Rua é obrigatória'),
    city: Yup.string().required('Cidade é obrigatória'),
    state: Yup.string().required('Estado é obrigatório'),
    zipCode: Yup.string().required('CEP é obrigatório'),
    country: Yup.string().required('País é obrigatório'),
  }),
  deliveryAddress: Yup.object({
    number: Yup.number().required('Número é obrigatório'),
    street: Yup.string().required('Rua é obrigatória'),
    city: Yup.string().required('Cidade é obrigatória'),
    state: Yup.string().required('Estado é obrigatório'),
    zipCode: Yup.string().required('CEP é obrigatório'),
    country: Yup.string().required('País é obrigatório'),
  }),
  dimensions: Yup.object({
    height: Yup.number().required('Altura é obrigatória'),
    width: Yup.number().required('Largura é obrigatória'),
    length: Yup.number().required('Comprimento é obrigatório'),
  }),
  productName: Yup.string().required('Nome do produto é obrigatório'),
});