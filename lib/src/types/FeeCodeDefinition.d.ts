import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
export declare enum FeeAccelerationRateType {
    CuratorDefined = 0,
    Additive = 1,
    Multiplicative = 2,
    Exponential = 3,
    Logarithmic = 4,
    Custom = 5
}
export declare class FeeCodeDefinition extends ChainObject {
    static INDEX_KEY: string;
    static DECIMAL_PRECISION: number;
    feeCode: string;
    feeThresholdUses: BigNumber;
    feeThresholdTimePeriod: number;
    baseQuantity: BigNumber;
    maxQuantity: BigNumber;
    maxUses?: BigNumber;
    feeAccelerationRateType: FeeAccelerationRateType;
    feeAccelerationRate: BigNumber;
    isCrossChannel?: boolean;
}