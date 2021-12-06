import { Body, CacheInterceptor, CacheTTL, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AdminService } from './admin.service';
import { Public, RequiredPermissions } from '../login/login.decorator';
import { EnableUserDto } from './dto/user.enable.dto';
import { AdminUserDto } from './dto/user.admin.dto';
import { Permission, UserWithPermissions, Version } from '@nw-company-tool/model';
import { DeleteUserDto } from './dto/user.delete.dto';

@Controller('/api/admin')
@RequiredPermissions(Permission.ADMIN)
@UseInterceptors(CacheInterceptor)
export class AdminController {
  constructor(private userService: UserService, private adminService: AdminService) {}

  @Get('/users')
  async getAllUsers(): Promise<UserWithPermissions[]> {
    return this.userService.findAllWithPermissions();
  }

  @Post('/users/delete')
  async deleteUser(@Body() body: DeleteUserDto): Promise<void> {
    return this.userService.delete(body.userId);
  }

  @Post('/users/enable')
  async setEnabled(@Body() body: EnableUserDto): Promise<void> {
    if (body.enabled) {
      await this.userService.setPermission(body.userId, Permission.ENABLED);
    } else {
      await this.userService.removePermission(body.userId, Permission.ENABLED);
    }
  }

  @Post('/users/admin')
  async setAdmin(@Body() body: AdminUserDto): Promise<void> {
    if (body.admin) {
      await this.userService.setPermission(body.userId, Permission.ADMIN);
    } else {
      await this.userService.removePermission(body.userId, Permission.ADMIN);
    }
  }

  @Post('/server/restart')
  async restart(): Promise<void> {
    this.adminService.restart();
  }

  @Post('/server/update')
  async update(): Promise<void> {
    await this.adminService.update();
  }

  @Get('/server/release/latest')
  @CacheTTL(300)
  async getLatestRelease(): Promise<Version> {
    return this.adminService.getLatestReleaseVersion();
  }

  @Public()
  @Get('/server/release/current')
  getCurrentRelease(): Version {
    return this.adminService.getCurrentReleaseVersion();
  }
}
