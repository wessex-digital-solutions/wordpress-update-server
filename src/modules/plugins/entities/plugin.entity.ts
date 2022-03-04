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
