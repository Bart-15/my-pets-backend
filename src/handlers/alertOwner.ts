import { headers } from '../helpers/const';
import { notifyOwner } from '../lib/notifyOwner';
import { handleError, HttpError } from '../middleware/errorHandler';
import validateResource from '../middleware/validateResource';
import { getPetById } from '../services/pet.service';
import { ProxyHandler } from '../types/handler.types';
import { createPetPayload } from '../validation/createPetValidationSchema';
import {
  notifyOwnerPayload,
  notifyOwnerValidationSchema,
} from '../validation/notifyOwnerValidation';

export const handler: ProxyHandler = async event => {
  try {
    const reqBody = JSON.parse(event.body as string) as notifyOwnerPayload;

    validateResource(notifyOwnerValidationSchema, reqBody);

    const id = event.pathParameters?.id as string;

    const pet = (await getPetById(id)) as createPetPayload;

    if (!pet) {
      throw new HttpError(404, {
        message: 'Pet not found',
      });
    }

    if (pet.notifiedCount >= 3) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: `You've reached the maximum limit. Please wait 24 hours and try again`,
        }),
      };
    }

    const payload = { ...reqBody };
    await notifyOwner(pet, payload);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Owner notified successfully!',
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};
