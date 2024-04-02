import { s3, TrackaPetsS3Bucket } from '../config/s3/s3';
import { generatePresignedURL, generateUUID } from '../helpers/const';

export interface IUploadImage {
  photo: string;
}

export async function uploadImage(parsedBody: IUploadImage) {
  const base64File = parsedBody.photo;

  const decodedFile: Buffer = Buffer.from(
    base64File.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const imageName = `${generateUUID()}.jpeg`;
  const params: AWS.S3.PutObjectRequest = {
    Bucket: TrackaPetsS3Bucket,
    Key: imageName,
    Body: decodedFile,
    ContentType: 'image/jpeg',
  };

  const url = await s3.upload(params).promise();

  const presignedUrl = await generatePresignedURL(imageName);

  return { url, presignedUrl };
}
