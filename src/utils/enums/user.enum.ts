import { registerEnumType } from '@nestjs/graphql';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

registerEnumType(UserGender, {
  name: 'UserGender',
  description: 'UserGender',
});
