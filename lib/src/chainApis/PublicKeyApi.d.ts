import { UserProfile } from "@gala-chain/api";
import { GalaChainProvider } from "../GalaChainClient";
import { RegisterEthUserRequest, RegisterUserRequest, UpdatePublicKeyRequest } from "../types";
import { GalaChainBaseApi } from "./GalaChainBaseApi";
export declare class PublicKeyApi extends GalaChainBaseApi {
    constructor(chainCodeUrl: string, connection: GalaChainProvider);
    GetMyProfile(message?: string, signature?: string): Promise<import("../types").GalaChainResponseSuccess<UserProfile>>;
    RegisterUser(dto: RegisterUserRequest): Promise<import("../types").GalaChainResponseSuccess<string>>;
    RegisterEthUser(dto: RegisterEthUserRequest): Promise<import("../types").GalaChainResponseSuccess<string>>;
    UpdatePublicKey(dto: UpdatePublicKeyRequest): Promise<import("../types").GalaChainResponseSuccess<void>>;
}
