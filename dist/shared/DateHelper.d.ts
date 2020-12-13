export declare class DateHelper {
    private static translationCallback;
    /**
     * Formatiert ein Date-Object nach der Vorlage von der C-Funktion strftime
     *
     * @param sFormat
     * @param date
     * @param useUTC
     * @returns {*|void|string}
     */
    static strftime(sFormat: any, date: any, useUTC?: any): any;
    static translate(key: any): any;
    static setTranslationCallback(callback: any): void;
}
