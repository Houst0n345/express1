import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../logger/ILogger';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {ValidateMiddleware} from "../common/validate.middleware";

injectable();
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'post',
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		next(new HTTPError('Ошибка авторизации', 401, 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(
				new HTTPError('Такой пользователь уже существует', 422, 'register'),
			);
		}
		this.ok(res, { email: result.email });
	}
}

``;
