import { BrowserProvider } from "ethers";
import { ExtendedEip1193Provider } from "../helpers";
import { BrowserConnectClient } from "./BrowserConnectClient";
declare global {
    interface Window {
        ethereum?: ExtendedEip1193Provider;
    }
}
export declare function getTrustWalletInjectedProvider({ timeout }?: {
    timeout: number;
}): Promise<BrowserProvider | undefined>;
export declare class TrustWalletConnectClient extends BrowserConnectClient {
    constructor();
    connect(): Promise<string>;
}
