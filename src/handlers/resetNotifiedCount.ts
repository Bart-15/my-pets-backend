import { headers } from '../helpers/const';
import { resetPetNotifiedCount } from '../lib/resetPetNotifiedCount';
import { handleError } from '../middleware/errorHandler';
import { getToResetNotifiedCount } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';

export const handler: ProxyHandler = async event => {
  try {
    const pets = await getToResetNotifiedCount();
    const reset = pets.map(item => resetPetNotifiedCount(item));

    await Promise.all(reset);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        processedCount: pets.length,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};
