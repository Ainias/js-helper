export declare class DateHelper {
    private static translationCallback;
    static FORMAT: {
        ISO_TIME: string;
        GERMAN: string;
    };
    /**
     * Formatiert ein Date-Object nach der Vorlage von der C-Funktion strftime
     *
     * @param sFormat
     * @param date
     * @param useUTC
     * @returns {*|void|string}
     */
    static strftime(sFormat: string, date?: Date | null, useUTC?: boolean): string;
    static translate(key: any): any;
    static setTranslationCallback(callback: any): void;
    static duration(timeInSeconds: any, locale?: undefined | string): string;
}
