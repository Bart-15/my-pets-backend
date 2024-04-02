import { headers } from '../helpers/const';
import { handleError, HttpError } from '../middleware/errorHandler';
import validateResource from '../middleware/validateResource';
import { getPetById, updatePet } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';
import {
  updatePetPayload,
  updatePetValidationSchema,
} from '../validation/createPetValidationSchema';

export const handler: ProxyHandler = async (event, context, callback) => {
  const { email: authUser } = event.requestContext.authorizer.claims;

  try {
    const reqBody = JSON.parse(event.body as string) as updatePetPayload;
    // Valiate the request body
    validateResource(updatePetValidationSchema, reqBody);

    const petId = event.pathParameters?.id as string;

    const pet = await getPetById(petId);

    if (!pet) {
      throw new HttpError(404, {
        message: 'Pet not found',
      });
    }

    // Check if the auth user is authorized to update the data
    if (pet.owner !== authUser) {
      throw new HttpError(401, {
        message: 'Unauthorized',
      });
    }

    const payload = {
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
    };

    await updatePet(petId, payload);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Pet updated successfully',
        auction: {
          petId,
          ...payload,
        },
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};
