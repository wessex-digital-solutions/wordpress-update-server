export class CreateUpdateDto {
  filename: string;
  path: string;
  version: string;
  hash: string;
  changelog: string;
  isStable: boolean;
  isPrerelease: boolean;
  isPublished: boolean;
  createdAt: Date;
}
