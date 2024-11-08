import { GalaChainProvider } from "../GalaChainClient";
import { DryRunRequest, DryRunResult, GetObjectByKeyRequest, GetObjectHistoryRequest } from "../types";
export declare class GalaChainBaseApi {
    protected chainCodeUrl: string;
    protected connection: GalaChainProvider;
    constructor(chainCodeUrl: string, connection: GalaChainProvider);
    DryRun(dto: DryRunRequest): Promise<import("../types").GalaChainResponseSuccess<DryRunResult>>;
    GetObjectByKey<T = Record<string, unknown>>(dto: GetObjectByKeyRequest): Promise<import("../types").GalaChainResponseSuccess<T>>;
    GetObjectHistory<T = Record<string, unknown>>(dto: GetObjectHistoryRequest): Promise<import("../types").GalaChainResponseSuccess<T>>;
}
