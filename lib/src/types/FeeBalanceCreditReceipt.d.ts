import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { FeeReceiptStatus } from "./FeeReceiptStatus";
export declare class FeeBalanceCreditReceipt extends ChainObject {
    static INDEX_KEY: string;
    year: string;
    month: string;
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
    creditToUser: string;
    txId: string;
    quantity: BigNumber;
    status: FeeReceiptStatus;
}
