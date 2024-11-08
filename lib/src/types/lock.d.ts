import BigNumber from "bignumber.js";
import { LockTokenQuantity } from "./LockTokenQuantity";
import { TokenInstanceKey } from "./TokenInstance";
import { ChainCallDTO } from "./dtos";
export declare class LockTokenDto extends ChainCallDTO {
    owner?: string;
    lockAuthority?: string;
    tokenInstance: TokenInstanceKey;
    quantity: BigNumber;
    useAllowances?: Array<string>;
}
export declare class LockTokensDto extends ChainCallDTO {
    lockAuthority?: string;
    tokenInstances: Array<LockTokenQuantity>;
    useAllowances?: Array<string>;
    name?: string;
    expires?: number;
}
export declare class UnlockTokenDto extends ChainCallDTO {
    tokenInstance: TokenInstanceKey;
    quantity?: BigNumber;
    owner?: string;
    lockedHoldName?: string;
}
export declare class UnlockTokensDto extends ChainCallDTO {
    tokenInstances: Array<LockTokenQuantity>;
    name?: string;
}
