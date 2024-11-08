import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { AllowanceType } from "./common";
export declare class TokenAllowance extends ChainObject {
    static INDEX_KEY: string;
    grantedTo: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    instance: BigNumber;
    allowanceType: AllowanceType;
    grantedBy: string;
    created: number;
    uses: BigNumber;
    usesSpent?: BigNumber;
    expires: number;
    quantity: BigNumber;
    quantitySpent?: BigNumber;
}