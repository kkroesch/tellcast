import { Module } from '@nestjs/common';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';
import { TweetGateway } from './tweet/tweet.gateway';
import { TweetStore } from './tweet/tweet.store';

@Module({
  controllers: [TweetController],
  providers: [TweetService, TweetGateway, TweetStore],
})
export class AppModule {}
