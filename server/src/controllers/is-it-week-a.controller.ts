import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const IS_IT_WEEKA: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'IsItWeekAResponse',
        properties: {
          isWeekend: {type: 'boolean'},
          week: {
            type: 'string',
            enum: ["A", "B", "unknown"]
          }
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class IsItWeekAController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping')
  @response(200, IS_IT_WEEKA)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}

