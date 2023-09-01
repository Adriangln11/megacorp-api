import { ApiProperty } from '@nestjs/swagger';

export class AddBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  released?: Date;
}
