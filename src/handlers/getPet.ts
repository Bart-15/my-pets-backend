import { generatePresignedURL, headers } from '../helpers/const';
import corsMiddleware from '../middleware/corsMiddleware';
import { handleError, HttpError } from '../middleware/errorHandler';
import { getPetById } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';

const getPet: ProxyHandler = async event => {
  try {
    const pet = await getPetById(event.pathParameters?.id as string);

    if (!pet) {
      throw new HttpError(404, {
        message: 'Pet not found',
      });
    }

    const tempPhoto = pet.photo ? await generatePresignedURL(pet.photo) : '';

    const modifiedData = {
      ...pet,
      photo: tempPhoto,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(modifiedData),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = corsMiddleware(getPet);
