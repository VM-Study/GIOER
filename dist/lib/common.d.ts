import { ClassTransformOptions } from 'class-transformer';
type PlainObject = Record<string, unknown>;
export declare function fillDto<T, V extends PlainObject>(DtoClass: new () => T, plainObject: V, options?: ClassTransformOptions): T;
export declare function fillDto<T, V extends PlainObject[]>(DtoClass: new () => T, plainObject: V, options?: ClassTransformOptions): T[];
export {};
