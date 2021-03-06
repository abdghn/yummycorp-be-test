import { Injectable, CanActivate, ExecutionContext, SetMetadata, Type, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const { role } = request.user;
    return roles.includes(role);
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);



