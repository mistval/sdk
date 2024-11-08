import { Eip1193Provider } from "ethers";
export declare function calculatePersonalSignPrefix(payload: object): string;
export interface ExtendedEip1193Provider extends Eip1193Provider {
    on(event: "accountsChanged", handler: Listener<string[]>): void;
    removeListener(event: "accountsChanged", handler: Listener<string[]>): void;
    providers?: Array<any>;
    isTrust?: boolean;
}
export interface MetaMaskEvents {
    accountChanged: string | null;
    accountsChanged: string[] | null;
}
export type Listener<T> = (data: T) => void;
export declare class EventEmitter<Events extends Record<string, any>> {
    private listeners;
    on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this;
    off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this;
    emit<K extends keyof Events>(event: K, data: Events[K]): boolean;
}
