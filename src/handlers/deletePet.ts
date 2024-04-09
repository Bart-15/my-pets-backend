import { headers } from '../helpers/const';
import corsMiddleware from '../middleware/corsMiddleware';
import { handleError, HttpError } from '../middleware/errorHandler';
import { destroyPet, getPetById } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';

export const deletePet: ProxyHandler = async event => {
  const { email: authUser } = event.requestContext.authorizer.claims;
  try {
    const petId = event.pathParameters?.id as string;

    const pet = await getPetById(petId);

    if (!pet) {
      throw new HttpError(404, {
        message: 'Pet not found',
      });
    }

    // Check if the auth user is authorized to delete the data
    if (pet.owner !== authUser) {
      throw new HttpError(401, {
        message: 'Unauthorized',
      });
    }

    await destroyPet(petId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Pet deleted successfully',
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = corsMiddleware(deletePet);
