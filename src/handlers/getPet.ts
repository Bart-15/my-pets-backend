import { headers } from '../helpers/const';
import { handleError, HttpError } from '../middleware/errorHandler';
import { getPetById } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';

export const handler: ProxyHandler = async event => {
  try {
    const pet = await getPetById(event.pathParameters?.id as string);

    if (!pet) {
      throw new HttpError(404, {
        message: 'Pet not found',
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(pet),
    };
  } catch (error) {
    return handleError(error);
  }
};
