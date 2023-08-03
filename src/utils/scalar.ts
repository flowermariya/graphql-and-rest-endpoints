import { GraphQLScalarType, Kind } from 'graphql';

const parseDate = (value: string): Date => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date;
};

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTimeCustom',
  description: 'A custom scalar for DateTime values',
  serialize: (value: Date) => {
    return value;
  },
  parseValue: parseDate,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return parseDate(ast.value);
    }
    throw new Error('Invalid date format');
  },
});
