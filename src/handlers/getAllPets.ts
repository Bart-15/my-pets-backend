import { headers } from '../helpers/const';
import corsMiddleware from '../middleware/corsMiddleware';
import { handleError } from '../middleware/errorHandler';
import { getPets } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';

export const getAllPets: ProxyHandler = async event => {
  const { email: authUser } = event.requestContext.authorizer.claims;

  try {
    const pets = await getPets(authUser);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        pets: pets,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = corsMiddleware(getAllPets);
