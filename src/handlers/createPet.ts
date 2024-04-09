import corsMiddleware from '../middleware/corsMiddleware';
import { handleError } from '../middleware/errorHandler';
import validateResource from '../middleware/validateResource';
import { addPet } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';
import {
  createPetPayload,
  createPetValidationSchema,
} from '../validation/createPetValidationSchema';
import { generateUUID, headers } from './../helpers/const';

const createPet: ProxyHandler = async event => {
  try {
    const { email } = event.requestContext.authorizer.claims;

    const reqBody = JSON.parse(event.body as string) as createPetPayload;

    validateResource(createPetValidationSchema, reqBody);

    const payload = {
      petId: generateUUID(),
      owner: email,
      name: reqBody.name,
      photo: reqBody.photo,
      species: reqBody.species,
      breed: reqBody.breed,
      age: reqBody.age,
      color: reqBody.color,
      weight: reqBody.weight,
      size: reqBody.size,
      temperament: reqBody.temperament,
      location: reqBody.location,
      birthDate: reqBody.birthDate,
      notifiedCount: 0, // TODO: Will notify the owner maximum of 3x a day
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

export const handler = corsMiddleware(createPet);
