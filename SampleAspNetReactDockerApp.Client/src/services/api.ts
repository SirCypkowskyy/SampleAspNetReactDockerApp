// @ts-nocheck

import { paths } from './endpoints';

type Path = keyof paths;
type PathMethod<T extends Path> = keyof paths[T];

type RequestParams<P extends Path, M extends PathMethod<P>> = paths[P][M] extends {
        parameters: any;
    }
    ? paths[P][M]['parameters']
    : undefined;
type ResponseType<P extends Path, M extends PathMethod<P>> = paths[P][M] extends {
        responses: { 200: { schema: { [x: string]: any } } };
    }
    ? paths[P][M]['responses'][200]['schema']
    : undefined;

export const apiCall = <P extends Path, M extends PathMethod<P>>(
    url: P,
    method: M,
    ...params: RequestParams<P, M> extends undefined ? [] : [RequestParams<P, M>]
): Promise<ResponseType<P, M>> => {
};