import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import * as middy from '@middy/core';
import * as httpJsonBodyParser from '@middy/http-json-body-parser';
import * as httpEventNormalizer from '@middy/http-event-normalizer';
import * as httpErrorHandler from '@middy/http-error-handler';
import * as createHttpError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = event.body;
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  try {
    await dynamodb.put({
      TableName : process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise();
  } catch (err) {
    console.error(err);
    throw new createHttpError.InternalServerError(err);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = middy(createAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
