import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { SortColumn, SortOrder } from 'src/enums/sort.enum';

@InputType()
export class PaginationAndSorting {
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  @ApiPropertyOptional({
    description:
      'Defines the maximum number of books that should be returned in a single request. If not provided, the default value is 5.',
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @Field(() => SortColumn, {
    nullable: true,
    defaultValue: SortColumn.CREATED_AT,
  })
  @ApiPropertyOptional({
    description:
      'The name of the column by which the retrieved books should be sorted. If not provided, the default sorting column is "CreatedAt".',
  })
  @IsOptional()
  @IsEnum(SortColumn)
  @IsOptional()
  sort_field?: SortColumn;

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.DESC })
  @ApiPropertyOptional({
    description:
      'The order in which the retrieved books should be sorted. The options are ascending (ASC) and descending (DESC). If not provided, the default sorting order is DESC.',
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sort_order?: SortOrder;
}
