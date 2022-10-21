import { NextPage } from "next"
import { HeaderStateProps } from "./hooks/useSearchState"
import { SearchResult } from "./services/validation"

export type F0<R = void> = () => R
export type F1<T, R = void> = (arg: T) => R
export type F2<T1, T2, R = void> = (arg1: T1, arg2: T2) => R

export type State<T extends string> = {
  type: T
}

export type ValueState<T extends string, V extends any> = State<T> & {
  value: V
}

export type NotFetched = State<"NotFetched">
export type Fetching = State<"Fetching">
export type Fetched<T> = ValueState<"Fetched", T>
export type Error = State<"Error"> & { message: string }
export type Ok<T> = ValueState<"Ok", T>
export type Async<T> = NotFetched | Fetching | Fetched<T> | Error
export type Either<T> = Ok<T> | Error

export type ExtractType<T> = T extends { type: infer T1 } ? T1 : never
export type ArrayItem<T> = T extends Array<infer T2> ? T2 : never
export type AsyncType = ExtractType<Async<any>>

export type PageProps = NextPage<{
  searchResults: Async<SearchResult> | ValueState<"FetchingMore", SearchResult>
  state: HeaderStateProps
}>
