import { Module } from '@nestjs/common';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';
import { TweetGateway } from './tweet/tweet.gateway';

@Module({
  controllers: [TweetController],
  providers: [TweetService, TweetGateway],
})
export class AppModule {}
