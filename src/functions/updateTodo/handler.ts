import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const dynamo = new DynamoDB.DocumentClient();

const putTodo = ({ id, text }) => {
  const params = {
    TableName: process.env.TODO_TABLE,
    Item: { id, text },
  };
  return dynamo.put(params).promise();
};

export const updateTodo: APIGatewayProxyHandler = async event => {
  const id = event.pathParameters.id;
  const text = JSON.parse(event.body).text;  
  const result = await putTodo({ id, text });

  return formatJSONResponse({
    message: result,
    event,
  });
};

export const main = middyfy(updateTodo);
