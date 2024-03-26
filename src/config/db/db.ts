import { DynamoDB } from 'aws-sdk';
export const db = new DynamoDB.DocumentClient();

export const PetsTable = 'PetsTable-dev';
