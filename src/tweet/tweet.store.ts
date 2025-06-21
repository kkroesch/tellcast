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
      'ws://localhost:8000/rpc',
      //'wss://tellcast-06boonlsk5t0rdhoihiaja32ds.aws-euw1.surreal.cloud',
    );

    await this.db.signin({
      username: 'root', //process.env.SURREALDB_USER!,
      password: 'root', //process.env.SURREALDB_PASSWORD!,
    });
    await this.db.use({
      namespace: 'public',
      database: 'tellcast',
    });
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
}
