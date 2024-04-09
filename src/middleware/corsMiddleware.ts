/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { allowedOrigins } from '../config/allowedOrigins';
import { handleError } from '../middleware/errorHandler';

const corsMiddleware = (handler: any) => {
  return async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const requestOrigin = event.headers?.origin || '';
    if (!allowedOrigins.includes(requestOrigin)) {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'CORS not allowed for this origin' }),
      };
    }

    // Call the original handler function and return its response
    try {
      const response = await handler(event, context);
      // Add CORS headers to the response
      response.headers = {
        ...response.headers,
        'Access-Control-Allow-Origin': requestOrigin,
        'Access-Control-Allow-Credentials': 'true',
      };

      return response;
    } catch (error) {
      return handleError(error);
    }
  };
};

export default corsMiddleware;
