import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plugin } from '../../plugins/entities/plugin.entity';

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
}
