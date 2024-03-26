import { coerce, number, object, string, TypeOf } from 'zod';

export const createPetValidationSchema = object({
  petId: string().optional(),
  owner: string().email().min(1, { message: 'Owner is required' }),
  name: string().min(1, { message: 'Petname is required' }),
  species: string().min(1, { message: 'Species is required' }),
  breed: string().min(1, { message: 'Breed is required' }),
  birthDate: string().pipe(coerce.date()),
  age: number().min(1, { message: 'Age is required' }).positive(),
  color: string().min(1, { message: 'Color is required' }),
  weight: number().min(1, { message: 'Weight is required' }),
  size: string().min(1, { message: 'Size is required' }),
  photo: string().url().optional(),
  temperament: string().min(1, { message: 'Temperament' }),
  location: string().min(1, { message: 'Location is required' }),
  qrCode: string().url().optional(),
});

export type createPetPayload = TypeOf<typeof createPetValidationSchema>;
