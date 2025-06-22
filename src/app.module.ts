import { Module } from '@nestjs/common';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';
import { TweetGateway } from './tweet/tweet.gateway';
import { TweetStore } from './tweet/tweet.store';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserStore } from './user/user.store';

@Module({
  controllers: [TweetController, UserController],
  providers: [TweetService, TweetGateway, TweetStore, UserService, UserStore],
})
export class AppModule {}
