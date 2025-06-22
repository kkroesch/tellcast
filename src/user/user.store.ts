import { Surreal } from 'surrealdb';
import { Injectable } from '@nestjs/common';
import { createSurrealConnection, unwrap } from '../db.config';

@Injectable()
export class UserStore {
  db: Surreal;

  async onModuleInit() {
    this.db = await createSurrealConnection();
  }

  async getByHandle(handle: string) {
    const result = await this.db.query(
      'SELECT * FROM user WHERE handle = $handle',
      { handle },
    );
    const user = unwrap(result);
    return user ?? null;
  }

  async getTweetsByUser(handle: string) {
    const result = await this.db.query(
      'SELECT * FROM tweet WHERE user = type::thing("user", $handle) ORDER BY timestamp DESC',
      { handle },
    );
    return result[0];
  }

  async getFollowGraph() {
    const result = await this.db.query(`
      SELECT in, out
      FROM follows
    `);
    return result[0];
  }

  async createFollow(followerId: string, handle: string) {
    const result = await this.db.query(
      'SELECT id FROM user WHERE handle = $handle',
      { handle },
    );
    const followedId = result[0];
    return this.db.query('RELATE $followerId->follows->$followedId', {
      followerId,
      followedId,
    });
  }
}
