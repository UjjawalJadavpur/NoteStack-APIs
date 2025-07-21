import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteDto } from './dto/note.dto';
import { Note } from './ note.entity';
import { User } from 'src/users/user.entity';
import { NotePriority } from './ enums/note-priority.enum';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {}

  getAllNotes(user: User) {
    return this.noteRepo.find({ where: { user } });
  }

  getActiveNotes(user: User) {
    return this.noteRepo.find({ where: { user, archived: false } });
  }

  getArchivedNotes(user: User) {
    return this.noteRepo.find({ where: { user, archived: true } });
  }

  getNotesByPriority(user: User, priority: NotePriority) {
    return this.noteRepo.find({ where: { user, priority, archived: false } });
  }

  async findById(id: number) {
    return this.noteRepo.findOne({ where: { id } });
  }

  async createNote(user: User, dto: NoteDto): Promise<Note> {
    const note = this.noteRepo.create({ ...dto, user });
    return this.noteRepo.save(note);
  }

  async updateNote(user: User, id: number, dto: NoteDto) {
    const note = await this.findById(id);
    if (!note) throw new NotFoundException();
    if (note.user.id !== user.id) throw new ForbiddenException();

    Object.assign(note, dto);
    return this.noteRepo.save(note);
  }

  async deleteNote(user: User, id: number) {
    const note = await this.findById(id);
    if (!note || note.user.id !== user.id) throw new ForbiddenException();

    return this.noteRepo.remove(note);
  }

  async archiveNote(user: User, id: number) {
    const note = await this.findById(id);
    if (!note || note.user.id !== user.id) throw new ForbiddenException();

    note.archived = true;
    return this.noteRepo.save(note);
  }

  async unarchiveNote(user: User, id: number) {
    const note = await this.findById(id);
    if (!note || note.user.id !== user.id) throw new ForbiddenException();

    note.archived = false;
    return this.noteRepo.save(note);
  }
}
