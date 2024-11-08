import BigNumber from "bignumber.js";
import { ChainCallDTO } from "./dtos";
export declare enum AllowanceType {
    Use = 0,
    Lock = 1,
    Spend = 2,
    Transfer = 3,
    Mint = 4,
    Swap = 5,
    Burn = 6
}
export declare class AllowanceKey extends ChainCallDTO {
    grantedTo: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    instance: BigNumber;
    allowanceType: AllowanceType;
    grantedBy: string;
    created: number;
}
export declare enum TokenMintStatus {
    Unknown = 0,
    Minted = 1,
    PartiallyMinted = 2,
    AllowanceTotalExceeded = 3,
    SupplyTotalExceeded = 4,
    NullAdministrativePatchEntry = 5
}
export declare class MintRequestDto {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    timeKey: string;
    totalKnownMintsCount: BigNumber;
    id: string;
    owner?: string;
    allowanceKey?: AllowanceKey;
    isTimeKeyValid(): boolean;
}