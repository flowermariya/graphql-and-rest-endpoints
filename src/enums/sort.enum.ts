import { registerEnumType } from '@nestjs/graphql';

export enum SortColumn {
  PRICE = 'Price',
  CREATED_AT = 'CreatedAt',
  PUBLISHED_ON = 'PublishedOn',
}

registerEnumType(SortColumn, {
  name: 'SortColumn',
  description: 'Columns by which results can be ordered.',
});

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Columns by which results can be ordered.',
});
