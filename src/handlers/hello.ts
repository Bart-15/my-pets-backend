import { ProxyHandler } from '@/types/handler.types';
interface HelloResponse {
  statusCode: number;
  body: string;
}

export const handler: ProxyHandler = (event, context, callback) => {
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!',
    }),
  };
  callback(undefined, response);
};
