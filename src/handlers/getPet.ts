import { ProxyHandler } from '../types/handler.types';
interface PetResponse {
  statusCode: number;
  body: string;
}

export const handler: ProxyHandler = (event, context, callback) => {
  const response: PetResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Gey by pet by id route',
    }),
  };
  callback(undefined, response);
};
