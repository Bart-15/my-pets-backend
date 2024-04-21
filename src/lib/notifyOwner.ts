import { db, PetsTable, sqs } from '../config/config';
import config from '../config/envConfig';
import { updatePetPayload } from '../validation/createPetValidationSchema';
import { notifyOwnerPayload } from '../validation/notifyOwnerValidation';

export async function notifyOwner(petDetails: updatePetPayload, payload: notifyOwnerPayload) {
  const notifiedCount = petDetails.notifiedCount as number;

  const params = {
    TableName: PetsTable,
    Key: {
      petId: petDetails.petId,
    },
    UpdateExpression: 'SET notifiedCount = :val',
    ExpressionAttributeValues: {
      ':val': notifiedCount + 1,
    },
  };

  await db.update(params).promise();

  await sqs
    .sendMessage({
      QueueUrl: config.TRACKAPETS_MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: `Found Your Beloved Pet '${petDetails.name}' 🐾! Please Contact Me ASAP - Via TrackaPet App`,
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
