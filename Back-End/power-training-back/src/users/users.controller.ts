import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' }) 
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9'}) 
 // @ApiParam({ name: 'id', type: 'uuid' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9 in param, and body, see example value below' }) 
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9 in param' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);// dato interesante, si se le coloca +id, el "+" lo convierte a number
  }
}
