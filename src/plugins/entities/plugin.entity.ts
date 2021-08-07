import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity()
export class Plugin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  version: string;

  @ManyToOne(() => Author, (author) => author.plugins)
  author: Author;

  @Column()
  enabled: boolean;

  @Column()
  homepage: string;

  @Column('simple-array')
  keywords: string[];

  @Column()
  license: string;

  @Column()
  repository: string;
}
