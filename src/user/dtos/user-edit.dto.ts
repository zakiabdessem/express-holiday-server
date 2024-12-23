// import {
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   IsArray,
// } from 'class-validator';
// import { UserRole } from '../../decorator/role.entity';

// export class UserEditDto {
//   @IsNotEmpty()
//   @IsString()
//   id?: string;

//   @IsEmail()
//   @IsOptional()
//   email?: string;

//   @IsString()
//   @IsOptional()
//   name?: string;

//   @IsOptional()
//   @IsString()
//   profilePicture?: string;

//   @IsOptional()
//   @IsString()
//   contactNumber?: string;

//   @IsOptional()
//   @IsString()
//   discordUsername?: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   skills?: string[];

//   @IsOptional()
//   @IsString()
//   tShirtSize?: string;

//   @IsOptional()
//   @IsEnum(UserRole)
//   role?: UserRole;

//   @IsOptional()
//   @IsString()
//   github?: string;

//   @IsOptional()
//   @IsString()
//   linkedin?: string;

//   @IsOptional()
//   @IsString()
//   portfolio?: string;

//   @IsOptional()
//   @IsEnum(['pending', 'accepted', 'rejected'])
//   status?: 'pending' | 'accepted' | 'rejected';
// }
