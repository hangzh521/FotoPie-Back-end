import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ResetModule } from "./reset/reset.module";
import { CollectModule } from "./collect/collect.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AdminModule,
    AdminAuthModule,
    UserModule,
    AuthModule,
    ResetModule,
    CollectModule,
  ],
})
export class AppModule {}
