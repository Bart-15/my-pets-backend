import { DynamoDB } from 'aws-sdk';
export const db = new DynamoDB.DocumentClient();
import config from '../envConfig';

export const PetsTable = config.TRACKAPETS_TABLE_NAME;
