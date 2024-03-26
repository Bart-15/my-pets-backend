/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => uuidv4();

export const generateUpdateQuery = <T extends Record<string, any>>(fields: T) => {
  const exp = {
    UpdateExpression: 'set',
    ExpressionAttributeNames: {} as Record<string, string>,
    ExpressionAttributeValues: {} as Record<string, any>,
  };
  Object.entries(fields).forEach(([key, item]) => {
    exp.UpdateExpression += `#${key} = :${key},`;
    exp.ExpressionAttributeNames[`#${key}`] = key;
    exp.ExpressionAttributeValues[`:${key}`] = item;
  });
  exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
  return exp;
};

export const headers = {
  'content-type': 'application/json',
};
