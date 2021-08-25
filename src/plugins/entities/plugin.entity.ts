import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Update } from '../../updates/entities/update.entity';

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

  @ManyToOne(() => Author, (author) => author.plugins)
  author: Author;

  @OneToMany(() => Update, (update) => update.plugin)
  updates: Update[];

  constructor(
    name?: string,
    description?: string,
    version?: string,
    homepage?: string,
    keywords?: string[],
    license?: string,
    repository?: string,
  ) {
    this.name = name;
    this.description = description;
    this.version = version;
    this.homepage = homepage;
    this.keywords = keywords;
    this.license = license;
    this.repository = repository;
  }
}
