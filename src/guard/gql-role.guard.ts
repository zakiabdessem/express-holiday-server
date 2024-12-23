import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/decorator/role.entity';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

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

      // Now check for the token in both cookies and headers
      const token = req.cookies.jwt || this.getTokenFromHeader(req);

      if (!token) {
        throw new UnauthorizedException('No authentication token provided.');
      }

      const user = verify(token, process.env.SECRET);

      if (!user || !user.role)
        throw new UnauthorizedException('No roles found for the user.');

      if (user.role === UserRole.ADMIN) return true;

      const hasRole = requiredRoles.includes(user.role);
      if (!hasRole)
        throw new UnauthorizedException(
          'User does not have the required roles.',
        );

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extracts the JWT token from the Authorization header.
   * @param req - The request object
   * @returns The token or null if no token is found
   */
  private getTokenFromHeader(req: any): string | null {
    const authHeader = req.headers.authorization || '';
    console.log("🚀 ~ GQLRolesGuard ~ getTokenFromHeader ~ authHeader:", authHeader)
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove "Bearer " from the start of the string
    }
    return null;
  }
}
