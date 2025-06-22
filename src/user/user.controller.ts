import { Controller, Get, Param, Render, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':handle')
  @Render('profile')
  async getProfile(@Param('handle') handle: string) {
    const profile = await this.userService.getByHandle(handle);
    const tweets = await this.userService.getTweetsByUser(handle);
    return { profile, tweets };
  }

  @Post(':handle/follow')
  async followUser(@Param('handle') handle: string, @Req() req) {
    const follower = 'user:karsten'; // Hardcoded for now
    await this.userService.followUser(follower, handle);
    return { success: true };
  }
}
