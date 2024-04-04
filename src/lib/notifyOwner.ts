import AWS from 'aws-sdk';

import { db, PetsTable } from '../config/db/db';
import config from '../config/envConfig';
import { updatePetPayload } from '../validation/createPetValidationSchema';
import { notifyOwnerPayload } from '../validation/notifyOwnerValidation';
const sqs = new AWS.SQS();

export async function notifyOwner(petDetails: updatePetPayload, payload: notifyOwnerPayload) {
  const params = {
    TableName: PetsTable,
    Key: {
      petId: petDetails.petId,
    },
    UpdateExpression: 'SET notifiedCount = :val',
    ExpressionAttributeValues: {
      ':val': petDetails?.notifiedCount + 1,
    },
  };

  await db.update(params).promise();

  await sqs
    .sendMessage({
      QueueUrl: config.TRACKAPETS_MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'Found Your Beloved Pet 🐾! Please Contact Me Immediately - From TrackaPet App',
        recipient: petDetails.owner,
        body: `${payload.message}\n
      \n
      Email: ${payload.email} \n
      Location: ${payload.location} \n
      Mobile number: ${payload.mobileNumber}
      `,
      }),
    })
    .promise();
}
