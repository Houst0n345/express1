import express, {Express} from 'express';
import {Server} from 'http';
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";

export class App {
    app: Express
    server: Server
    port: number
    logger: LoggerService
    usersController: UsersController
    exceptionFilter: ExceptionFilter

    constructor(
        logger: LoggerService,
        usersController: UsersController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express()
        this.port = 8000
        this.logger = logger
        this.usersController = usersController
        this.exceptionFilter = exceptionFilter
    }

    useRoutes() {
        this.app.use('/users', this.usersController.router)
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes()
        this.useExceptionFilters()
        this.app.listen(this.port)
        this.logger.log(`Сервер запущена на http://localhost:${this.port}`)
    }
}