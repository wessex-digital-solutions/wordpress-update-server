import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message:
        'Welcome to the API!,you can find all the endpoints here: https://github.com/wessex-digital-solutions/wordpress-update-server/wiki',
    };
  }
}
