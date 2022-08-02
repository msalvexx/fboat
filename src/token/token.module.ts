import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
