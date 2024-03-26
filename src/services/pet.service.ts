import { db, PetsTable } from '../config/db/db';
import { generateUpdateQuery } from '../helpers/const';
import { createPetPayload } from '../validation/createPetValidationSchema';

export async function addPet(input: createPetPayload) {
  return await db
    .put({
      TableName: PetsTable,
      Item: input,
    })
    .promise();
}

export async function getPetById(id: string) {
  const pet = await db
    .get({
      TableName: PetsTable,
      Key: {
        id: id,
      },
    })
    .promise();

  return pet.Item;
}

export async function updatePet(id: string, input: Partial<createPetPayload>) {
  const data = generateUpdateQuery(input);

  const params = {
    TableName: PetsTable,
    Key: {
      id: id,
    },
    ConditionExpression: 'attribute_exists(id)',
    ...data,
    ReturnValues: 'ALL_NEW',
  };

  return await db.update(params).promise();
}

export async function destroyPet(id: string) {
  return await db
    .delete({
      TableName: PetsTable,
      Key: {
        id: id,
      },
    })
    .promise();
}
