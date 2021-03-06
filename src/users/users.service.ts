import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import {inject, injectable} from 'inversify';
import { TYPES } from '../../types';
import {IConfigService} from "../config/config.service.interface";

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
        const newUser = new User(email, name);
		const salt = +this.configService.get('SALT')
        await newUser.setPassword(password, salt)
		return newUser;
	}
	validateUser(dto: UserRegisterDto): boolean {
		return true;
	}
}
