import { CryptoNetwork } from "./CryptoNetwork";

export type LayerStatus = "active" | "inactive" | 'insufficient_liquidity';
export type Layer = {
    display_name: string;
    internal_name: string;
    status: LayerStatus;
} & LayerData

type LayerData = ({
    isExchange: true;
    assets?: ExchangeL2Asset[];
    authorization_flow: "o_auth2" | "api_credentials" | 'none';
} | {
    isExchange: false;
    assets?: BaseL2Asset[];
    average_completion_time?: string
})

export type BaseL2Asset = {
    asset: string;
    network_internal_name: string;
    network: CryptoNetwork;
    is_default: boolean;
    status: LayerStatus
}

export type ExchangeL2Asset = {
    withdrawal_fee: number;
    min_deposit_amount: number;
} & BaseL2Asset