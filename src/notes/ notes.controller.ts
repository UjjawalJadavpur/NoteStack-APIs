import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';
import { NotePriority } from './ enums/note-priority.enum';
import { UserRequest } from 'src/common/ interfaces/user-request.interface';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAll(@Req() req: UserRequest) {
    return this.notesService.getAllNotes(req.user);
  }

  @Get('active')
  getActive(@Req() req: UserRequest) {
    return this.notesService.getActiveNotes(req.user);
  }

  @Get('archived')
  getArchived(@Req() req: UserRequest) {
    return this.notesService.getArchivedNotes(req.user);
  }

  @Get('priority/:level')
  getByPriority(@Req() req: UserRequest, @Param('level') level: NotePriority) {
    return this.notesService.getNotesByPriority(req.user, level);
  }

  @Post()
  create(@Req() req: UserRequest, @Body() dto: NoteDto) {
    return this.notesService.createNote(req.user, dto);
  }

  @Put(':id')
  update(@Req() req: UserRequest, @Param('id', ParseIntPipe) id: number, @Body() dto: NoteDto) {
    return this.notesService.updateNote(req.user, id, dto);
  }

  @Put(':id/archive')
  archive(@Req() req: UserRequest, @Param('id', ParseIntPipe) id: number) {
    return this.notesService.archiveNote(req.user, id);
  }

  @Put(':id/unarchive')
  unarchive(@Req() req: UserRequest, @Param('id', ParseIntPipe) id: number) {
    return this.notesService.unarchiveNote(req.user, id);
  }

  @Delete(':id')
  delete(@Req() req: UserRequest, @Param('id', ParseIntPipe) id: number) {
    return this.notesService.deleteNote(req.user, id);
  }
}
