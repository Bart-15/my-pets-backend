import { SQSHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const ses = new AWS.SES({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler: SQSHandler = async (event): Promise<any> => {
  const record = event.Records[0];
  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: 'brat.tabusao@gmail.com',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  };
  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
