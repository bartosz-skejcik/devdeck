// these types will be useful for later when
// managing asynchronous behavior in stores
// by creating saga-like effects

export enum LoadingState {
    Idle = "idle",
    Loading = "loading",
    Success = "success",
    Error = "error",
}

export type AsyncState<TData, TError = unknown> = {
    data?: TData;
} & (IdleStatus | LoadingStatus | SuccessStatus<TData> | ErrorStatus<TError>);

export type IdleStatus = {
    status: LoadingState.Idle;
};

export type LoadingStatus = {
    status: LoadingState.Loading;
};

export type SuccessStatus<TData> = {
    status: LoadingState.Success;
    data: TData;
};

export type ErrorStatus<TError = unknown> = {
    status: LoadingState.Error;
    error: TError;
};
