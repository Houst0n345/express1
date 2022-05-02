import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../logger/ILogger';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('не удалось прочитать файл .env или он отсутствует');
		} else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends number | string>(key: string): T {
		return this.config[key] as T;
	}
}
