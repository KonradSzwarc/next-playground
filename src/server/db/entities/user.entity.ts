export interface UserEntity {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type InsertUserEntity = Pick<UserEntity, 'name' | 'email' | 'image'> & Partial<Pick<UserEntity, 'id'>>;

export type UpdateUserEntity = Partial<Pick<UserEntity, 'id' | 'name' | 'email' | 'emailVerified' | 'image'>>;

export type UpsertUserEntity = UpdateUserEntity;
