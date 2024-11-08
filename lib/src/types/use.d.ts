import BigNumber from "bignumber.js";
import { TokenInstanceKey } from "./TokenInstance";
import { ChainCallDTO } from "./dtos";
export declare class ReleaseTokenDto extends ChainCallDTO {
    tokenInstance: TokenInstanceKey;
}
export declare class UseTokenDto extends ChainCallDTO {
    owner?: string;
    inUseBy: string;
    tokenInstance: TokenInstanceKey;
    quantity: BigNumber;
    useAllowances?: Array<string>;
}
