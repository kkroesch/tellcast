import Surreal from 'surrealdb';
import { createSurrealConnection, unwrap } from '../db.config';

export class TweetStore {
  private db: Surreal;

  async onModuleInit() {
    this.db = await createSurrealConnection();
  }

  async save(tweet: { user: string; text: string; timestamp: string }) {
    const result = await this.db.query(
      `
      LET $user = type::thing("user", $userId);
      CREATE tweet SET user = $user, text = $text, timestamp = $timestamp;
      `,
      {
        userId: tweet.user ?? 'karsten', // oder dynamisch
        text: tweet.text,
        timestamp: tweet.timestamp,
      },
    );
    return tweet;
  }

  async getById(id: string) {
    const result = await this.db.query(
      'SELECT * FROM tweet WHERE id = $id FETCH user',
      { id },
    );
    console.log('Getting tweet by ID:', result);
    return unwrap(result);
  }

  async getRecent(limit = 20) {
    const result = await this.db.query(
      `SELECT *, count(<-likes) AS likes FROM tweet ORDER BY timestamp DESC LIMIT $limit FETCH user`,
      { limit },
    );
    return result[0];
  }

  async likeTweet(userId: string, tweetId: string) {
    return this.db.query(
      `
       LET $from = type::thing("user", $userId);
       LET $to = type::thing("tweet", $tweetId);
       RELATE $from->likes->$to;
       `,
      {
        userId: userId.replace(/^user:/, ''),
        tweetId: tweetId.replace(/^tweet:/, ''),
      },
    );
  }
}
