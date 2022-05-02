import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/ILogger';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { json } from 'body-parser';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express() ;
		this.port = 8000;
	}
	useMiddleware(): void {
		this.app.use(json())
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.useMiddleware()
		this.useRoutes();
		this.useExceptionFilters();
		this.app.listen(this.port);
		this.logger.log(`Сервер запущена на http://localhost:${this.port}`);
	}
}
