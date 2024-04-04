import { db, PetsTable } from '../config/config';
import { updatePetPayload } from '../validation/createPetValidationSchema';

export async function resetPetNotifiedCount(petDetails: updatePetPayload) {
  const params = {
    TableName: PetsTable,
    Key: {
      petId: petDetails.petId,
    },
    UpdateExpression: 'SET notifiedCount = :val',
    ExpressionAttributeValues: {
      ':val': 0,
    },
  };

  await db.update(params).promise();
}
