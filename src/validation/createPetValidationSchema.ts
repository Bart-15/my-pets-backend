import { coerce, number, object, string, TypeOf } from 'zod';

export const createPetValidationSchema = object({
  petId: string().optional(),
  name: string().min(1, { message: 'Petname is required' }),
  species: string().min(1, { message: 'Species is required' }),
  breed: string().min(1, { message: 'Breed is required' }),
  birthDate: string().pipe(coerce.date()),
  age: number().min(1, { message: 'Age is required' }).positive(),
  color: string().min(1, { message: 'Color is required' }),
  weight: number().min(1, { message: 'Weight is required' }),
  size: string().min(1, { message: 'Size is required' }),
  notifiedCount: number(),
  photo: string().min(1, { message: 'Photo is required' }),
  temperament: string().min(1, { message: 'Temperament' }),
  fullAddress: string().min(1, { message: 'Full address is required' }),
});

export type createPetPayload = TypeOf<typeof createPetValidationSchema>;

export const updatePetValidationSchema = object({
  petId: string().optional(),
  owner: string().email().optional(),
  name: string().min(1, { message: 'Petname is required' }),
  species: string().min(1, { message: 'Species is required' }),
  breed: string().min(1, { message: 'Breed is required' }),
  birthDate: string().pipe(coerce.date()),
  age: number().min(1, { message: 'Age is required' }).positive(),
  color: string().min(1, { message: 'Color is required' }),
  weight: number().min(1, { message: 'Weight is required' }),
  size: string().min(1, { message: 'Size is required' }),
  notifiedCount: number().optional(),
  photo: string().min(1, { message: 'Photo is required' }),
  temperament: string().min(1, { message: 'Temperament' }),
  fullAddress: string().min(1, { message: 'Full Address is required' }),
});

export type updatePetPayload = TypeOf<typeof updatePetValidationSchema>;
