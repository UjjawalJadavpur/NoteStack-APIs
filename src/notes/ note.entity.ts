import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotePriority } from './ enums/note-priority.enum';
import { User } from 'src/users/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  archived: boolean;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @Column({ type: 'enum', enum: NotePriority, default: NotePriority.MEDIUM })
  priority: NotePriority;
}
