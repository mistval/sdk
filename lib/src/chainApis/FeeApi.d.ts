import { GalaChainProvider } from "../GalaChainClient";
import { FeeAuthorizationRequest, FeeProperties, FetchFeeAuthorizationsResponse, FetchFeePropertiesRequest, SetFeePropertiesRequest } from "../types";
import { GalaChainBaseApi } from "./GalaChainBaseApi";
export declare class FeeApi extends GalaChainBaseApi {
    constructor(chainCodeUrl: string, connection: GalaChainProvider);
    AuthorizeFee(dto: FeeAuthorizationRequest): Promise<import("../types").GalaChainResponseSuccess<FetchFeeAuthorizationsResponse>>;
    FetchFeeAutorizations(dto: FetchFeeAuthorizationsResponse): Promise<import("../types").GalaChainResponseSuccess<FetchFeeAuthorizationsResponse>>;
    FetchFeeProperties(dto: FetchFeePropertiesRequest): Promise<import("../types").GalaChainResponseSuccess<FeeProperties>>;
    SetFeeProperties(dto: SetFeePropertiesRequest): Promise<import("../types").GalaChainResponseSuccess<FeeProperties>>;
}
