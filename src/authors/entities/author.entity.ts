import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plugin } from '../../plugins/entities/plugin.entity';
import { Theme } from '../../themes/entities/theme.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date')
  registered: Date;

  @Column()
  location: string;

  @Column()
  website: string;

  @Column()
  bio: string;

  @OneToMany(() => Plugin, (plugin) => plugin.author)
  plugins: Plugin[];

  @OneToMany(() => Theme, (theme) => theme.author)
  themes: Theme[];

  constructor(
    name?: string,
    location?: string,
    website?: string,
    bio?: string,
  ) {
    this.name = name;
    this.registered = new Date();
    this.location = location;
    this.website = website;
    this.bio = bio;
  }
}
