import { InternalServerErrorException } from '@nestjs/common';

export class EnvVarNotFoundError extends InternalServerErrorException {
  constructor(name: string) {
    const message = `Env variable [${name}] not found`;
    super(message);
  }
}

interface GetEnvOptions<T> {
  default?: T;
}

export function getEnv(
  name: string,
  options: GetEnvOptions<string> = {}
): string {
  const value = process.env[name];

  if (value === undefined) {
    if (options.default !== undefined) return options.default;
    throw new EnvVarNotFoundError(name);
  }

  return value;
}

export function getEnvBoolean(
  name: string,
  options: GetEnvOptions<boolean> = {}
): boolean {
  const strValue = getEnv(name, { default: options.default?.toString() });

  return strValue.toLowerCase() === 'true';
}

export function getEnvNumber(
  name: string,
  options: GetEnvOptions<number> = {}
): number {
  const strValue = getEnv(name, { default: options.default?.toString() });

  return parseInt(strValue, 10);
}
