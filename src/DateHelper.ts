import {Helper} from "./Helper";

export class DateHelper {
    private static translationCallback: (key: string) => string;

    private static readonly startTimestamp = Date.now();
    private static readonly testTimestamp: number | undefined = (typeof process === "object" && process.env.TEST_TIMESTAMP) ? parseInt(process.env.TEST_TIMESTAMP) : undefined;

    static FORMAT = {
        ISO_TIME: "%Y-%m-%dT%H:%M:%S",
        GERMAN: "%d.%m.%y %H:%M:%S"
    }

    static now() {
        const realNow = Date.now();
        if (this.testTimestamp !== undefined) {
            const diff = realNow - this.startTimestamp;
            return this.testTimestamp + diff;
        }
        return realNow;
    }

    static newDate() {
        return new Date(DateHelper.now());
    }


    /**
     * Formatiert ein Date-Object nach der Vorlage von der C-Funktion strftime
     *
     * @param sFormat
     * @param date
     * @param useUTC
     * @returns {*|void|string}
     */
    static strftime(sFormat: string, date?: Date|null, useUTC?: boolean) {
        useUTC = Helper.nonNull(useUTC, false);

        date = Helper.nonNull(date, new Date());
        if (!(date instanceof Date)) date = new Date(date);

        let nDay = (useUTC) ? date.getUTCDay() : date.getDay(),
            nDate = (useUTC) ? date.getUTCDate() : date.getDate(),
            nMonth = (useUTC) ? date.getUTCMonth() : date.getMonth(),
            nYear = (useUTC) ? date.getUTCFullYear() : date.getFullYear(),
            nHour = (useUTC) ? date.getUTCHours() : date.getHours(),
            aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            aDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
            isLeapYear = function () {
                if ((nYear & 3) !== 0) return false;
                return nYear % 100 !== 0 || nYear % 400 === 0;
            },
            getThursday = function () {
                let target = new Date(date);
                target.setDate(nDate - ((nDay + 6) % 7) + 3);
                return target;
            },
            zeroPad = function (nNum, nPad) {
                return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
            };

        return sFormat.replace(/%[a-z]/gi, (sMatch) => {
            return {
                '%a': this.translate(aDaysShort[nDay]),
                '%A': this.translate(aDays[nDay]),
                '%b': this.translate(aMonths[nMonth].slice(0, 3)),
                '%B': this.translate(aMonths[nMonth]),
                '%c': date.toUTCString(),
                '%C': Math.floor(nYear / 100),
                '%d': zeroPad(nDate, 2),
                '%e': nDate,
                '%f': zeroPad(date.getTime() % 1000, 4),
                '%F': date.toISOString().slice(0, 10),
                '%G': getThursday().getFullYear(),
                '%g': ('' + getThursday().getFullYear()).slice(2),
                '%H': zeroPad(nHour, 2),
                '%I': zeroPad((nHour + 11) % 12 + 1, 2),
                '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
                '%k': '' + nHour,
                '%l': (nHour + 11) % 12 + 1,
                '%m': zeroPad(nMonth + 1, 2),
                '%M': zeroPad(date.getMinutes(), 2),
                '%p': (nHour < 12) ? 'AM' : 'PM',
                '%P': (nHour < 12) ? 'am' : 'pm',
                '%s': Math.round(date.getTime() / 1000),
                '%S': zeroPad(date.getSeconds(), 2),
                '%u': nDay || 7,
                '%w': '' + nDay,
                '%x': date.toLocaleDateString(),
                '%X': date.toLocaleTimeString(),
                '%y': ('' + nYear).slice(2),
                '%Y': nYear,
                '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
                '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
            }[sMatch] || sMatch;
        });
    }

    static translate(key) {
        if (this.translationCallback) {
            return this.translationCallback(key);
        }
        return key;
    }

    static setTranslationCallback(callback) {
        this.translationCallback = callback;
    }

    static duration(timeInSeconds, locale: undefined | string = undefined){
        const nonPaddedIntl = Intl.NumberFormat(locale, { minimumIntegerDigits: 1 });
        const paddedIntl = Intl.NumberFormat(locale, { minimumIntegerDigits: 2 })

        const [delimiter] = new Date().toLocaleTimeString('en-us').match(/\b[:.]\b/);
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor(timeInSeconds / 60) % 60;
        const seconds = timeInSeconds % 60;
        const indexToPad = hours ? 0 : 1;
        return [hours, minutes, seconds]
            .map((val, i) => {
                return (val < 10 && i > indexToPad) ? paddedIntl.format(val) : nonPaddedIntl.format(val);
            })
            .filter((val, i) => {
                if (i === 0) {
                    return !(val === '00' || val === '0');
                }

                return true;
            })
            .join(delimiter);
    }
}
