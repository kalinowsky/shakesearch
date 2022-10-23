import { NextPage } from "next"
import { HeaderStateProps } from "./hooks/useSearchState"

export type F0<R = void> = () => R
export type F1<T, R = void> = (arg: T) => R
export type F2<T1, T2, R = void> = (arg1: T1, arg2: T2) => R

export type State<T extends string> = {
  type: T
}

export type ValueState<T extends string, V extends any> = State<T> & {
  value: V
}
export type Ok<T> = ValueState<"Ok", T>
export type Err = State<"Error"> & { message: string }

export type NotFetched = State<"NotFetched">
export type Fetching = State<"Fetching">
export type Fetched<T> = ValueState<"Fetched", T>

export type Async<T> = NotFetched | Fetching | Fetched<T> | Err
export type AsyncWithPersistence<T> = Async<T> | ValueState<"FetchingMore", T>
export type Either<T> = Ok<T> | Err

export type ExtractType<T> = T extends { type: infer T1 } ? T1 : never
export type ArrayItem<T> = T extends Array<infer T2> ? T2 : never
export type AsyncType = ExtractType<Async<any>>

export type PageProps = NextPage<{
  state: HeaderStateProps
}>
