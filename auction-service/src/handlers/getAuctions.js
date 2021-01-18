import AWS from 'aws-sdk';
import * as middy from '@middy/core';
import * as httpJsonBodyParser from '@middy/http-json-body-parser';
import * as httpEventNormalizer from '@middy/http-event-normalizer';
import * as httpErrorHandler from '@middy/http-error-handler';
import * as createHttpError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
    let auctions;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.AUCTIONS_TABLE_NAME
        }).promise();

        auctions = result.Items;
    } catch (err) {
        console.error(err);
        throw new createHttpError.InternalServerError(err);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auctions),
    };
}

export const handler = middy(getAuctions)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
