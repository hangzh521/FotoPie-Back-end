import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { Like, LikeDocument } from '../like/schemas/like.schema';
import { User, UserDocument } from "../user/schemas/user.schema";
import { ListBucketIntelligentTieringConfigurationsCommand } from '@aws-sdk/client-s3';

@Controller('notification')

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/latest')
  async getLatestLikes(): Promise<any> {
    const likes = await this.notificationService.getLatestLikes(10);
    const notifications = await Promise.all(
      likes.map(async (like) => {
        const users = await this.notificationService.getLikeUsers(like);
        const posts = await this.notificationService.getLikePosts(like);
        const user = users[0];
        const post = posts[0];
        return {
          userAvatar: user?.avatarPath,
          userName: user?.firstName,
          post: post?.compressFilePath,
        };
      }),
    );
    return notifications;
  }
}