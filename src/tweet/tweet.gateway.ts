import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class TweetGateway {
  private clients: Response[] = [];

  addClient(res: Response) {
    this.clients.push(res);
    res.on('close', () => {
      this.clients = this.clients.filter((c) => c !== res);
    });
  }

  broadcast(html: string) {
    const payload = `data: ${JSON.stringify({ html })}\n\n`;
    this.clients.forEach((res) => res.write(payload));
  }
}
