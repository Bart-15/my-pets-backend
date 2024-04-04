import { DynamoDB, S3, SQS } from 'aws-sdk';
export const db = new DynamoDB.DocumentClient();
import config from './envConfig';

export const s3 = new S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
});

export const PetsTable = config.TRACKAPETS_TABLE_NAME;
export const TrackaPetsS3Bucket = config.TRACKAPETS_BUCKET;
export const sqs = new SQS();
