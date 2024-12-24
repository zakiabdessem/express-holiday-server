import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/decorator/role.entity';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/user/user.schema';

@Injectable()
export class GQLRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) return true;

      const gqlContext = GqlExecutionContext.create(context).getContext();
      const req = gqlContext.req;

      const access_token =
        req.cookies.access_token || this.getTokenFromHeader(req);

      if (!access_token) {
        throw new HttpException(
          {
            message: 'No Access token found.',
            customCode: 'ACCESS_TOKEN_MISSING',
          },
          401,
        );
      }

      const user = verify(access_token, process.env.SECRET) as UserEntity;

      if (!user || !user.role) {
        throw new HttpException(
          {
            message: 'No roles found for the user.',
            customCode: 'ROLE_MISSING',
          },
          403,
        );
      }

      if (user.role === UserRole.ADMIN) return true;

      const hasRole = requiredRoles.includes(user.role);

      if (!hasRole) {
        throw new HttpException(
          {
            message: 'User does not have the required roles.',
            customCode: 'ROLE_UNAUTHORIZED',
          },
          403,
        );
      }

      return true;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Invalid token',
          customCode: 'TOKEN_INVALID',
        },
        401,
      );
    }
  }

  
  /**
   * Extracts the JWT token from the Authorization header.
   * @param req - The request object
   * @returns The token or null if no token is found
   */
  private getTokenFromHeader(req: any): string | null {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove "Bearer " from the start of the string
    }
    return null;
  }
}



