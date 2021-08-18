import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'helloparams',
        request: {
          parameters: {
            querystrings: {
              name: true,
            }
          }
        }
      }
    }
  ]
}
