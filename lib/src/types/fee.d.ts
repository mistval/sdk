import BigNumber from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { FeeAuthorization } from "./FeeAuthorization";
import { FeeBalanceCreditReceipt } from "./FeeBalanceCreditReceipt";
import { FeeChannelPaymentReceipt } from "./FeeChannelPaymentReceipt";
import { FeeAccelerationRateType, FeeCodeDefinition } from "./FeeCodeDefinition";
import { FeeCodeTransferPercentage } from "./FeeCodeSplitFormula";
import { FeePendingBalance } from "./FeePendingBalance";
import { FeeThresholdUses } from "./FeeThresholdUses";
import { ChainCallDTO } from "./dtos";
export declare class FeePropertiesDto extends ChainCallDTO {
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    instance: BigNumber;
    uniqueKey?: string;
}
export declare class FetchFeePropertiesDto extends ChainCallDTO {
}
export declare class FeeAuthorizationDto extends ChainCallDTO {
    authority: string;
    quantity: BigNumber;
    uniqueKey?: string;
}
export declare class FeeAuthorizationResDto extends ChainCallDTO {
    authorization: string;
    authority: string;
    created: number;
    txId: string;
    quantity: BigNumber;
    feeAuthorizationKey: string;
}
export declare class FetchFeeAuthorizationsDto extends ChainCallDTO {
    authority?: string;
    year?: string;
    month?: string;
    day?: string;
    hours?: string;
    minutes?: string;
    feeCode?: string;
    txId?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FetchFeeAuthorizationsResDto extends ChainCallDTO {
    results: FeeAuthorization[];
    nextPageBookmark?: string;
}
export declare class FetchFeeChannelPaymentsDto extends ChainCallDTO {
    year?: string;
    month?: string;
    day?: string;
    hours?: string;
    minutes?: string;
    feeCode?: string;
    paidByUser?: string;
    txId?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FeeChannelPaymentKeyValueResult extends ChainCallDTO {
    key: string;
    value: FeeChannelPaymentReceipt;
}
export declare class FetchFeeChannelPaymentsResDto extends ChainCallDTO {
    results: FeeChannelPaymentKeyValueResult[];
    nextPageBookmark?: string;
}
export declare class FetchFeeCreditReceiptsDto extends ChainCallDTO {
    year?: string;
    month?: string;
    day?: string;
    hours?: string;
    minutes?: string;
    feeCode?: string;
    creditToUser?: string;
    txId?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FeeCreditReceiptKeyValueResult extends ChainCallDTO {
    key: string;
    value: FeeBalanceCreditReceipt;
}
export declare class FetchFeeCreditReceiptsResponse extends ChainCallDTO {
    results: FeeCreditReceiptKeyValueResult[];
    nextPageBookmark?: string;
}
export declare class FetchFeeScheduleDto extends ChainCallDTO {
    feeCode?: string;
}
export declare class FetchFeeScheduleResDto extends ChainCallDTO {
    results: FeeCodeDefinition[];
    nextPageBookmark?: string;
}
export declare class FetchFeePendingBalancesDto extends ChainCallDTO {
    owner?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FeePendingBalanceKeyValueResult extends ChainCallDTO {
    key: string;
    value: FeePendingBalance;
}
export declare class FetchFeePendingBalancesResDto extends ChainCallDTO {
    results: FeePendingBalanceKeyValueResult[];
    nextPageBookmark?: string;
}
export declare class FeeBalanceSettlementDto extends ChainCallDTO {
    startDate?: number;
    endDate?: number;
    owner?: string;
}
export declare class FeeCodeDefinitionDto extends ChainCallDTO {
    feeCode: string;
    feeThresholdUses: BigNumber;
    feeThresholdTimePeriod: number;
    baseQuantity: BigNumber;
    maxQuantity: BigNumber;
    feeAccelerationRateType: FeeAccelerationRateType;
    feeAccelerationRate: BigNumber;
    isCrossChannel?: boolean;
}
export declare class FeeCodeSplitFormulaDto extends ChainCallDTO {
    feeCode: string;
    burnPercentage: number;
    transferPercentages: FeeCodeTransferPercentage[];
}
export declare class FeeVerificationDto extends ChainCallDTO {
    authorization: string;
    authority: string;
    created: number;
    txId: string;
    quantity: BigNumber;
    feeAuthorizationKey: string;
    uniqueKey?: string;
}
export declare class FetchFeeThresholdUsesDto extends ChainCallDTO {
    feeCode: string;
    user: string;
}
export declare class FetchFeeThresholdUsesResDto extends ChainCallDTO {
    feeCode: string;
    user: string;
    cumulativeUses: BigNumber;
    cumulativeFeeQuantity: BigNumber;
}
export declare class FetchFeeThresholdUsesWithPaginationDto extends ChainCallDTO {
    feeCode?: string;
    bookmark?: string;
    limit?: number;
}
export declare class FeeThresholdUsesKeyValueResult extends ChainCallDTO {
    key: string;
    value: FeeThresholdUses;
}
export declare class FetchFeeThresholdUsesWithPaginationResponse extends ChainCallDTO {
    results: FeeThresholdUsesKeyValueResult[];
    nextPageBookmark?: string;
}
export declare class ChainKeysDto extends ChainCallDTO {
    chainKeys: string[];
}
export declare class ChainKeyValueResult extends ChainCallDTO {
    key: string;
    value: ChainObject;
}
export declare class FetchChainKeyValueObjectsWithPaginationResponse extends ChainCallDTO {
    results: ChainKeyValueResult[];
    nextPageBookmark?: string;
}
export declare class FeeBalanceSettlement extends ChainCallDTO {
    balance: FeePendingBalance;
    receipt?: FeeBalanceCreditReceipt | undefined;
}
export declare class SettleFeeBalancesResponse extends ChainCallDTO {
    results: FeeBalanceSettlement[];
}
export declare class SettleFeeCreditReceiptsResponse extends ChainCallDTO {
    results: FeeBalanceCreditReceipt[];
}
export declare class SettleFeePaymentReceiptsResponse extends ChainCallDTO {
    results: FeeChannelPaymentReceipt[];
}
export declare class FeeExemptionDto extends ChainCallDTO {
    user: string;
    limitTo?: string[];
}
