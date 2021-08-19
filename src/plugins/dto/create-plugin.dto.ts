import { Author } from 'src/authors/entities/author.entity';

export class CreatePluginDto {
  name: string;
  description?: string;
  version: string;
  author?: Author;
  enabled?: boolean;
  homepage?: string;
  license?: string;
  repository?: string;
  keywords?: string[];
}
