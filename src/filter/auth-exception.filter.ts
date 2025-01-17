import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    // Convert the HttpException to a GraphQLError
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    throw new GraphQLError(
      exceptionResponse.message || 'Internal server error',
      {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          status,
          ...exceptionResponse,
        },
      },
    );
  }
}
