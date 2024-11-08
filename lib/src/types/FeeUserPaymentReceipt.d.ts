import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { FeeReceiptStatus } from "./FeeReceiptStatus";
export declare class FeeUserPaymentReceipt extends ChainObject {
    static INDEX_KEY: string;
    paidByUser: string;
    year: string;
    month: string;
    day: string;
    txId: string;
    quantity: BigNumber;
    status: FeeReceiptStatus;
}
