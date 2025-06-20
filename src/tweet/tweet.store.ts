import Surreal from 'surrealdb';
import * as dotenv from 'dotenv';

export class TweetStore {
  private db: Surreal;

  constructor() {
    this.db = new Surreal();
    dotenv.config();
  }

  async connect() {
    await this.db.connect(
      'wss://tellcast-06boonlsk5t0rdhoihiaja32ds.aws-euw1.surreal.cloud',
      {
        namespace: process.env.SURREALDB_NAMESPACE!,
        database: process.env.SURREALDB_DATABASE!,
      },
    );
    await this.db.use({
      database: process.env.SURREALDB_DATABASE!,
    });
    await this.db.signin({
      username: process.env.SURREALDB_USER!,
      password: process.env.SURREALDB_PASSWORD!,
    });
  }

  async save(tweet: { user: string; text: string; timestamp: string }) {
    return this.db.create('tweet', tweet);
  }

  async getRecent(limit = 20) {
    return this.db.query(
      `SELECT * FROM tweet ORDER BY timestamp DESC LIMIT $limit`,
      { limit },
    );
  }
}
