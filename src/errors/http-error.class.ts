export class HTTPError extends Error{
    statusCode: number
    context: string
    constructor(message: string, code: number, context: string) {
        super(message);
        this.statusCode = code
        this.context = context
    }
}