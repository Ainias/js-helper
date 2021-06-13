export declare class MatomoHelper {
    static start(url: string, siteId: number, scriptName?: string): void;
    static log(category: string, action: string, name?: string, value?: string): void;
    static apiCall(apiCall: string, ...args: any[]): void;
    static execute(func: () => any): void;
}
