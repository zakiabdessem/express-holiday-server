import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

const getTokenFromHeader = (req: any): string | null => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7); // Remove "Bearer " from the start of the string
  }
  return null;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    const req = gqlContext.req;
    const token = req.cookies.jwt || getTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided.');
    }

    const user = verify(token, process.env.SECRET);
    return user;
  },
);
