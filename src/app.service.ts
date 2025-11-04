import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  selamVer(): string {
    return 'salam aleyküm dünya!';
  }
}
