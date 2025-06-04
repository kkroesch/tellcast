import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import { Request } from 'express';

@Injectable()
export class TweetService {
  buildTweetContext(req: Request, body: { text: string }) {
    const user = req.user?.username || 'anonymous';
    return {
      user,
      text: body.text,
      timestamp: new Date().toLocaleString(),
    };
  }

  renderTweet(context: any): Promise<string> {
    return renderFile(
      join(__dirname, '../../views/partials/tweet.ejs'),
      context,
    );
  }
}
