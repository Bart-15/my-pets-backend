import { ProxyHandler } from '@/types/handler.types';
interface PetResponse {
  statusCode: number;
  body: string;
}

export const handler: ProxyHandler = (event, context, callback) => {
  const response: PetResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world, this is a private route',
      context: event.requestContext.authorizer.claims,
    }),
  };
  callback(undefined, response);
};
