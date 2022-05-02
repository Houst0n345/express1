import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule } from 'inversify';
import { ILogger } from './logger/ILogger';
import { TYPES } from '../types';
import { IUsersController } from './users/users.controller.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';

export const appBindings = new ContainerModule((bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IUsersController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUsersService>(TYPES.UserService).to(UsersService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
