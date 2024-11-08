import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
export declare class FeeCodeTransferPercentage extends ChainObject {
    transferToUser: string;
    transferPercentage: number;
}
export declare class FeeCodeTransferQuantity extends ChainObject {
    transferToUser: string;
    transferPercentage: number;
    transferQuantity: BigNumber;
}
export declare class FeeCodeSplitFormula extends ChainObject {
    static INDEX_KEY: string;
    feeCode: string;
    burnPercentage: number;
    transferPercentages: FeeCodeTransferPercentage[];
    calculateAmounts(totalFeeQuantity: BigNumber, tokenDecimals: number): [BigNumber, FeeCodeTransferQuantity[]];
    validatePercentages(): Promise<FeeCodeSplitFormula>;
}
