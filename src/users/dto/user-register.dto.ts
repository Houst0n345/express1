import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, {message: 'неверно указан email'})
    email: string;

    @IsString({message: 'не указан пароль'})
    password: string;

    @IsString({message: 'не указано имя'})
    name: string;
}