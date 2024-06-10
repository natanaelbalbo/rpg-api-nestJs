import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CharactersService } from 'src/service/characters.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { OpenAiService } from 'src/service/serviceApi';

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly openAiService: OpenAiService, 
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCharacterDto: any) {
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
  async update(@Param('id') id: string, @Body() updateCharacterDto: any) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-background')
  async generateBackground(@Body() character: any) {
    return this.openAiService.generateCharacterBackground(character); 
  }
}
