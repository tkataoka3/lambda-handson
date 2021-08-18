import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const dynamo = new DynamoDB.DocumentClient();

const findAllTodo = () => {
  const params = { TableName: process.env.TODO_TABLE };
  return dynamo.scan(params).promise();
};

export const getTodos: APIGatewayProxyHandler = async (event) => {
  const result = await findAllTodo();
  console.log(result);

  return formatJSONResponse({
    message: result,
    event,
  });
};

export const main = middyfy(getTodos);
