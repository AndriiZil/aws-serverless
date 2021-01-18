import AWS from 'aws-sdk';
import * as middy from '@middy/core';
import * as httpJsonBodyParser from '@middy/http-json-body-parser';
import * as httpEventNormalizer from '@middy/http-event-normalizer';
import * as httpErrorHandler from '@middy/http-error-handler';
import * as createHttpError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
    let auction;
    const { id } = event.pathParameters;

    try {
        const result = await dynamodb.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id }
        }).promise();

        auction = result.Item;
    } catch (err) {
        console.error(err);
        throw new createHttpError.InternalServerError(err);
    }

    if (!auction) {
        throw new createHttpError.NotFound(`Auction with ID "${id}" was not found.`)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auction),
    };
}

export const handler = middy(getAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
