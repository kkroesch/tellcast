import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:handle')
  async getProfile(@Param('handle') handle: string, @Res() res) {
    const profile = await this.userService.getByHandle(handle);
    if (!profile) {
      return res.status(404).render('404');
    }
    const tweets = await this.userService.getTweetsByUser(handle);
    return res.render('profile', { profile, tweets });
  }

  @Post('user/:handle/follow')
  async followUser(@Param('handle') handle: string, @Req() req) {
    const follower = 'user:karsten'; // Hardcoded for now
    await this.userService.followUser(follower, handle);
    return { success: true };
  }

  @Get('/graph')
  @Render('graph')
  async getGraph() {
    const edges = await this.userService.getFollowGraph();
    return { edges };
  }
}
