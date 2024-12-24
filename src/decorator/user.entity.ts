import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/user/user.schema';

const getTokenFromHeader = (req: any): string | null => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7); // Remove "Bearer " from the start of the string
  }
  return null;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    const req = gqlContext.req;

    const refresh_token = req.cookies.refresh_token || getTokenFromHeader(req);

    if (!refresh_token) {
      throw new HttpException(
        {
          message: 'No Refresh token found.',
          customCode: 'REFRESH_TOKEN_MISSING',
        },
        401,
      );
    }

    const user = verify(refresh_token, process.env.SECRET) as UserEntity;

    return user;
  },
);
