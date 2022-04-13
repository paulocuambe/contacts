import { IsOptional } from 'class-validator';

export class SearchParams {
  @IsOptional()
  q: string;

  @IsOptional()
  deleted = 'false';
}
