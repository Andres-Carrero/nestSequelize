import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserRoleService } from '../services/userRole.service';

@Controller('UsersRoles')
export class UserRoleController {
    constructor(private services: UserRoleService){}


    @Post(':userId/:roleId')
    async setRoleToUser(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ){ 
        console.log(userId);
        console.log(roleId);
        
      return this.services.setRoleToUser(userId, roleId);
    }





}
