import Surreal from 'surrealdb';
import { createSurrealConnection } from '../db.config';

export class TweetStore {
  private db: Surreal;

  async onModuleInit() {
    this.db = await createSurrealConnection();
  }

  async save(tweet: { user: string; text: string; timestamp: string }) {
    const result = await this.db.create('tweet', tweet);
    return result[0];
  }

  async getById(id: string) {
    const result = await this.db.query(
      'SELECT * FROM tweet WHERE id = $id FETCH user',
      { id },
    );
    return result[0];
  }

  async getRecent(limit = 20) {
    const result = await this.db.query(
      `SELECT * FROM tweet ORDER BY timestamp DESC LIMIT $limit FETCH user`,
      { limit },
    );
    return result[0];
  }

  async createLike(userId: string, handle: string) {
    const result = await this.db.query(
      'SELECT id FROM user WHERE handle = $handle',
      { handle },
    );
    const likedId = result[0];
    return this.db.query('RELATE $userId->likes->$likedId', {
      userId,
      likedId,
    });
  }
}
