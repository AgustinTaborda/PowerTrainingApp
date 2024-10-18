import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';
import { Response } from 'express';
import { GoogleAuthGuard } from '../guards/google.guard';
import { JWTAuthGuard } from 'src/guards/jwtauth.guard';
import { CombinedAuthGuard } from 'src/guards/google-jwtauth.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { notificationSender } from '../mailer/routinesender.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/seed')
  @ApiOperation({ summary: 'Seed users' })
  async seedUsers() {
    try {
      await this.usersService.seedUsers();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al cargar usuarios.');
    }
    return { message: 'Usuarios cargados correctamente.' };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('/admin')
  @ApiOperation({ summary: 'Create a new Admin' })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.usersService.createAdmin(createAdminDto);
  }
  @Get('/logout')
  logout(@Res() res: Response) {
    // Redirigir al usuario al logout de Auth0
    // const auth0LogoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.POST_LOGOUT_REDIRECT_URI}`;
    const auth0LogoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.POST_LOGOUT_REDIRECT_URI}`;

    // Redirigir al usuario a la URL de logout de Auth0
    return res.redirect(auth0LogoutUrl);
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.Admin, Role.Superadmin)
  @UseGuards(CombinedAuthGuard, RolesGuard)
  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 5,
    description: 'Limite de items por página',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Número de página',
  })
  @ApiOperation({ summary: 'Retrieve all users' })
  findAll(@Query('limit') limit: number = 5, @Query('page') page: number = 1) {
    return this.usersService.findAll(limit, page);
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.Admin, Role.Superadmin)
  @UseGuards(CombinedAuthGuard, RolesGuard)
  @Get('/related')
  @ApiOperation({ summary: 'Retrieve all users with their relations' })
  findAllRelated() {
    return this.usersService.findAllRelated();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(CombinedAuthGuard)
  @Get('/byFilters')
  @ApiOperation({
    summary:
      'Retrieve all users that match with criteria, name,lastname,birthday,role,email, example: users/byFilters?email=myemail@mail.com&name=jhon&role=true',
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'lastname', required: false, type: String })
  @ApiQuery({ name: 'birthday', required: false, type: String })
  @ApiQuery({ name: 'role', required: false, type: Boolean })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAllByFilters(
    @Query('name') name?: string,
    @Query('lastname') lastname?: string,
    @Query('birthday') birthday?: string,
    @Query('role') role?: string,
    @Query('email') email?: string,
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10, 
  ): Promise<{ data: UserEntity[]; count: number }> {
    if (!name && !lastname && !birthday && !role && !email) {
      throw new BadRequestException(
        'At least one filter must be provided, example /users/byFilters?name=John&email=john@example.com&page=2&limit=5',
      );
    }
    return this.usersService.findAllByFilters(
      { name, lastname, birthday, role, email },
      page,
      limit,
    );
  }

  /*
  @Get('/auth1')
  loginWhitAuth0(@Req() req : Request) {
    console.log(req.oidc.user);
   console.log('El estado de req.oidc.isAuthenticated() en users.controller.ts es '+req.oidc.isAuthenticated());
    return req.oidc.isAuthenticated() ? 'Logged in' : 'Not logged in';
  }*/

  @ApiBearerAuth('access-token')
  @UseGuards(CombinedAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary:
      'Retrieve an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9',
  })
  // @ApiParam({ name: 'id', type: 'uuid' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(CombinedAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary:
      'Update an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9 in param, and body, see example value below',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id)
    return this.usersService.update(id, updateUserDto);
  }

  // @ApiBearerAuth('access-token')
  @UseGuards(CombinedAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9 in param',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id); // dato interesante, si se le coloca +id, el "+" lo convierte a number
  }

  @Post('receiveroutinesByEmail/:email')
  async receiveRoutineByemail(@Param('email') email: string) {
   
    return await this.usersService.receiveRoutineByEmail(email);
  }
  
  @Post('receiveroutinesByUuid/:uuid')
  async receiveRoutineByUuid(@Param('uuid') uuid: string) {
   
    return await this.usersService.receiveRoutineByUUID(uuid);
  }
    
}
