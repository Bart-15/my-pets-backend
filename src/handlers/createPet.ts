import { handleError } from '../middleware/errorHandler';
import validateResource from '../middleware/validateResource';
import { addPet } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';
import {
  createPetPayload,
  createPetValidationSchema,
} from '../validation/createPetValidationSchema';
import { generateUUID, headers } from './../helpers/const';

export const handler: ProxyHandler = async event => {
  try {
    const { email } = event.requestContext.authorizer.claims;

    const reqBody = JSON.parse(event.body as string) as createPetPayload;

    validateResource(createPetValidationSchema, reqBody);

    const payload = {
      petId: generateUUID(),
      owner: email,
      name: reqBody.name,
      qrCode: '',
      photo: '',
      species: reqBody.species,
      breed: reqBody.breed,
      age: reqBody.age,
      color: reqBody.color,
      weight: reqBody.weight,
      size: reqBody.size,
      temperament: reqBody.temperament,
      location: reqBody.location,
      birthDate: reqBody.birthDate,
    };

    await addPet(payload);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Pet Successfully created!',
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};
