import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Plugin } from '../../plugins/entities/plugin.entity';
import { Theme } from '../../themes/entities/theme.entity';

@Entity()
export class Update {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  version: string;

  @Column()
  hash: string;

  @Column('text')
  changelog: string;

  @Column()
  isStable: boolean;

  @Column()
  isPrerelease: boolean;

  @Column()
  isPublished: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Plugin, (plugin) => plugin.updates)
  plugin: Plugin;

  @ManyToOne(() => Theme, (theme) => theme.updates)
  theme: Theme;

  constructor(partial: Partial<Update>) {
    Object.assign(this, partial);
  }
}
