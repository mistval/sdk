import { ChainObject } from "./ChainObject";
export declare class FeeExemption extends ChainObject {
    static INDEX_KEY: string;
    user: string;
    limitedTo?: string[];
}
