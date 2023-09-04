import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IsAdminPipe implements PipeTransform {
  constructor() {}

  transform(value: any) {
    console.log(value.headers);

    const { currentUser } = value.req;

    if (!currentUser.isAdmin) {
      throw new UnauthorizedException('Admin access required');
    }

    return value;
  }
}
