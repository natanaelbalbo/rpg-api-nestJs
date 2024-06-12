import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CharactersService } from 'src/service/characters.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateCharacterDto } from 'src/DTOs/create-character.dto';
import { UpdateCharacterDto } from 'src/DTOs/update-character.dto';



@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.charactersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-background/:id')
  async generateBackground(@Param('id') id: string) {
    return this.charactersService.generateCharacterBackground(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('random')
  async createRandom(@Body('level') level: number) {
    return this.charactersService.createRandomCharacter(level);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-adventure')
  async generateAdventure(@Body('characterIds') characterIds: string[]) {
    return this.charactersService.generateAdventure(characterIds);
  }
}
