import { S3 } from 'aws-sdk';

import config from '../envConfig';
export const s3 = new S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
});

export const TrackaPetsS3Bucket = config.TRACKAPETS_BUCKET;
