import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import helloworld from '@functions/helloworld';
import helloparams from '@functions/helloparams';
import findAllTodo from '@functions/findAllTodo';
import createTodo from '@functions/createTodo';
import updateTodo from '@functions/updateTodo';


const serverlessConfiguration: AWS = {
  service: 'lambda-handson-tkataoka',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-northeast-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMODB_TABLE: '${self:service}-${self:provider.stage}',
      TODO_TABLE: '${self:provider.environment.DYNAMODB_TABLE}-todo',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource:
          'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}*',
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      Todo: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.TODO_TABLE}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  // import the function via paths
  functions: { hello, helloworld, helloparams, findAllTodo, createTodo, updateTodo},
};

module.exports = serverlessConfiguration;
