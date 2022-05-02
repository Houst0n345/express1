export class HTTPError extends Error {
	statusCode: number;
	context: string | undefined;
	constructor(message: string, code: number, context: string | undefined) {
		super(message);
		this.statusCode = code;
		this.context = context;
	}
}
