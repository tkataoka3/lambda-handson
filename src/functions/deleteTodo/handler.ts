import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const dynamo = new DynamoDB.DocumentClient();

const removeTodo = ({ id }) => {
  const params = {
    TableName: process.env.TODO_TABLE,
    Key: { id },
  };
  return dynamo.delete(params).promise();
};

export const deleteTodo: APIGatewayProxyHandler = async event => {
  const id = event.pathParameters.id;
  const result = await removeTodo({ id });

  return formatJSONResponse({
    message: result,
    event,
  });
};

export const main = middyfy(deleteTodo);
