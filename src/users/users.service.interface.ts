import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUsersService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	validateUser: (dto: UserRegisterDto) => boolean;
}
