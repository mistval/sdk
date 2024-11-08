import { BigNumber } from "bignumber.js";
import { ChainObject } from "./ChainObject";
import { FeeReceiptStatus } from "./FeeReceiptStatus";
export declare class FeeChannelPaymentReceipt extends ChainObject {
    static INDEX_KEY: string;
    year: string;
    month: string;
    day: string;
    feeCode: string;
    paidByUser: string;
    txId: string;
    quantity: BigNumber;
    status: FeeReceiptStatus;
}
