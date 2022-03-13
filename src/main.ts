import { App } from "./app"
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";

async function bootstrap(){
    const loggerService = new LoggerService()
    const usersController = new UsersController(loggerService)
    const exceptionFilter = new ExceptionFilter(loggerService)
    const app = new App(loggerService, usersController, exceptionFilter)
    await app.init()
}

bootstrap()