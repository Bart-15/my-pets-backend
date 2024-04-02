import { headers } from '../helpers/const';
import { handleError, HttpError } from '../middleware/errorHandler';
import { IUploadImage, uploadImage } from '../services/uploadPetPhoto.service';
import { ProxyHandler } from '../types/handler.types';

export const handler: ProxyHandler = async event => {
  try {
    const parsedBody = JSON.parse(event.body as string) as IUploadImage;

    if (!parsedBody?.photo) throw new HttpError(400, { error: 'Base64 image is required.' });
    const { url, presignedUrl } = await uploadImage(parsedBody);

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Pet Photo successfully uploaded to s3 bucket',
        presignedURL: presignedUrl,
        url: url.Location,
        fileName: url.Key,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};
