import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    const response = { status: 'ok', message: 'Hello API' };
    return response;
  }
}
