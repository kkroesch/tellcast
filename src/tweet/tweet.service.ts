import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import { Request } from 'express';

@Injectable()
export class TweetService {
  buildTweetContext(req: Request, body: { text: string }) {
    const user = req.user?.username || 'anonymous';
    const rawText = body.text;

    const formattedText = rawText
      .replace(
        /@([a-zA-Z0-9_]+)/g,
        '<a href="/user/$1" class="mention">@$1</a>',
      )
      .replace(/#(\w+)/g, '<a href="/tag/$1" class="hashtag">#$1</a>');

    return {
      user,
      text: formattedText,
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
