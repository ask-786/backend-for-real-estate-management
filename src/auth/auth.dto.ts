import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserReginstrationDto {
  @ApiProperty({ example: 'John', description: "User's first name" })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Doe', description: "User's last name" })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'john@example.com',
    description: "User's email address",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890', description: "User's phone number" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'securePassword123!',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: "User's email address",
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    example: 'securePassword123!',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
