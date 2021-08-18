import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';


const helloPathParameter: APIGatewayProxyHandler = async event => {
  const name = event.queryStringParameters.name;
  console.log(`Your Name is ${name}`);

  return formatJSONResponse({
    message: `Your Name is ${name}`,
  });
}

export const main = middyfy(helloPathParameter);
