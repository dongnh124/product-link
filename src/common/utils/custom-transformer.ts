import { Transform, TransformFnParams } from 'class-transformer';

export function TransformTrim() {
  return Transform(({ value }: TransformFnParams) => {
    if (value) {
      return value.trim();
    }
    return value;
  });
}

export function TransformLowerCase() {
  return Transform(({ value }: TransformFnParams) => {
    if (value) {
      return value.toLowerCase();
    }
    return value;
  });
}
