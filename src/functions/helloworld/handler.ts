import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';


const helloworld: APIGatewayProxyHandler = async event => {
  const id = event.pathParameters.id;
  console.log(`Your ID is ${id}`);

  return formatJSONResponse({
    message: `Your ID is ${id}`,
  });
}

export const main = middyfy(helloworld);
