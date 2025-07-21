import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NotePriority } from '../ enums/note-priority.enum';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(NotePriority)
  priority?: NotePriority = NotePriority.MEDIUM;
}
