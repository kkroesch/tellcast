import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import { Request } from 'express';
import { TweetStore } from './tweet.store';

@Injectable()
export class TweetService {
  constructor(private readonly store: TweetStore) {}

  async buildTweetContext(req: Request, body: { text: string }) {
    const user = req.user?.username || 'karsten';
    const rawText = body.text;

    const formattedText = rawText
      .replace(
        /@([a-zA-Z0-9_]+)/g,
        '<a href="/user/$1" class="mention">@$1</a>',
      )
      .replace(/#(\w+)/g, '<a href="/tag/$1" class="hashtag">#$1</a>');

    const tweet = {
      user,
      text: formattedText,
      timestamp: new Date().toISOString(),
    };
    await this.store.save(tweet);
    return tweet;
  }

  async getById(id: string) {
    const result = await this.store.getById(id);
    return result;
  }

  renderTweet(context: any): Promise<string> {
    return renderFile(
      join(__dirname, '../../views/partials/tweet.ejs'),
      context,
    );
  }

  async likeTweet(userId: string, tweetId: string) {
    return this.store.likeTweet(userId, tweetId);
  }

  async getRecentTweets(limit = 20) {
    const result = await this.store.getRecent(limit);
    return result;
  }
}
