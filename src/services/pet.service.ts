import { db, PetsTable } from '../config/db/db';
import { generateUpdateQuery } from '../helpers/const';
import { createPetPayload, updatePetPayload } from '../validation/createPetValidationSchema';

export async function getPets(email: string) {
  const params = {
    TableName: PetsTable,
    IndexName: 'ownerEmail',
    KeyConditionExpression: '#owner = :owner',
    ExpressionAttributeValues: {
      ':owner': email,
    },
    ExpressionAttributeNames: {
      '#owner': 'owner',
    },
  };

  const pets = await db.query(params).promise();
  return pets.Items as createPetPayload[];
}

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
        petId: id,
      },
    })
    .promise();

  return pet.Item;
}

export async function updatePet(id: string, input: Partial<updatePetPayload>) {
  const data = generateUpdateQuery(input);

  const params = {
    TableName: PetsTable,
    Key: {
      petId: id,
    },
    ConditionExpression: 'attribute_exists(petId)',
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
        petId: id,
      },
    })
    .promise();
}
