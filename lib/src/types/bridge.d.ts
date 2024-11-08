import BigNumber from "bignumber.js";
import { ChainId } from "./ChainId";
import { TokenInstanceKey } from "./TokenInstance";
import { ChainCallDTO } from "./dtos";
import { OracleBridgeFeeAssertionDto } from "./oracle";
export declare class RequestTokenBridgeOutDto extends ChainCallDTO {
    destinationChainId: ChainId;
    tokenInstance: TokenInstanceKey;
    quantity: BigNumber;
    recipient: string;
    destinationChainTxFee?: OracleBridgeFeeAssertionDto;
}
