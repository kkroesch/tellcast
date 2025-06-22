import { Injectable } from '@nestjs/common';
import { UserStore } from './user.store';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly store: UserStore) {}

  async getByHandle(handle: string) {
    const result = await this.store.getByHandle(handle);
    return result;
  }

  async getTweetsByUser(handle: string) {
    return this.store.getTweetsByUser(handle);
  }

  async followUser(followerId: string, handle: string) {
    return this.store.createFollow(followerId, handle);
  }

  async getFollowGraph() {
    return this.store.getFollowGraph();
  }
}
