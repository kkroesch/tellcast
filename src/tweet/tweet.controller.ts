import { Controller, Get, Post, Req, Body, Render, Res } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetGateway } from './tweet.gateway';
import { renderFile } from 'ejs';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller()
export class TweetController {
  constructor(
    private tweetService: TweetService,
    private tweetGateway: TweetGateway,
  ) {}

  @Get()
  @Render('tweets')
  getPage() {
    return {};
  }

  @Post('tweet')
  async postTweet(@Req() req: Request, @Body() body: { text: string }) {
    req.user = { username: 'telluser' }; // hardcoded user
    const context = this.tweetService.buildTweetContext(req, body);
    const html = await this.tweetService.renderTweet(context);
    this.tweetGateway.broadcast(html);
    return html;
  }

  @Get('tweet/events')
  sse(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    this.tweetGateway.addClient(res);
  }

  @Post('api/tweet/push')
  async pushApi(@Req() req: Request, @Body() body: { text: string }) {
    req.user = { username: 'apiuser' }; // hardcoded user for API
    const context = this.tweetService.buildTweetContext(req, body);
    const html = await this.tweetService.renderTweet(context);
    this.tweetGateway.broadcast(html);
    return { status: 'ok', ...context };
  }
}
