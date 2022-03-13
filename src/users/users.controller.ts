import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class";

export class UsersController extends BaseController {

    constructor(logger: LoggerService) {
        super(logger)
        this.bindRoutes([
            {
                path: '/login',
                func: this.login,
                method: 'post'
            },
            {
                path: '/register',
                func: this.register,
                method: 'post'
            }
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError('Ошибка авторизации', 401, 'login'))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
}