import {Helper} from "./Helper";

export class DateHelper{
    // /**
    //  * Formatiert ein Date-Object nach der Vorlage von der C-Funktion strftime
    //  *
    //  * @param sFormat
    //  * @param date
    //  * @param useUTC
    //  * @returns {*|void|string|never}
    //  */
    // static strftime(sFormat, date, useUTC, makePersistentTranslation) {
    //     useUTC = Helper.nonNull(useUTC, false);
    //     makePersistentTranslation = Helper.nonNull(makePersistentTranslation, true);
    //
    //     date = Helper.nonNull(date, new Date());
    //     if (!(date instanceof Date)) date = new Date(date);
    //
    //     let nDay = (useUTC) ? date.getUTCDay() : date.getDay(),
    //         nDate = (useUTC) ? date.getUTCDate() : date.getDate(),
    //         nMonth = (useUTC) ? date.getUTCMonth() : date.getMonth(),
    //         nYear = (useUTC) ? date.getUTCFullYear() : date.getFullYear(),
    //         nHour = (useUTC) ? date.getUTCHours() : date.getHours(),
    //         aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    //         aDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    //         aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //         aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    //         isLeapYear = function () {
    //             if ((nYear & 3) !== 0) return false;
    //             return nYear % 100 !== 0 || nYear % 400 === 0;
    //         },
    //         getThursday = function () {
    //             let target = new Date(date);
    //             target.setDate(nDate - ((nDay + 6) % 7) + 3);
    //             return target;
    //         },
    //         zeroPad = function (nNum, nPad) {
    //             return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
    //         };
    //
    //     return sFormat.replace(/%[a-z]/gi, function (sMatch) {
    //         return {
    //             '%a': (makePersistentTranslation)?Translator.makePersistentTranslation(aDaysShort[nDay]).outerHTML:Translator.translate(aDaysShort[nDay]),
    //             '%A': (makePersistentTranslation)?Translator.makePersistentTranslation(aDays[nDay]).outerHTML:Translator.translate(aDays[nDay]),
    //             '%b': (makePersistentTranslation)?Translator.makePersistentTranslation(aMonths[nMonth].slice(0, 3)).outerHTML:Translator.translate(aMonths[nMonth].slice(0, 3)),
    //             '%B': (makePersistentTranslation)?Translator.makePersistentTranslation(aMonths[nMonth]).outerHTML:Translator.translate(aMonths[nMonth]),
    //             '%c': date.toUTCString(),
    //             '%C': Math.floor(nYear / 100),
    //             '%d': zeroPad(nDate, 2),
    //             '%e': nDate,
    //             '%f': zeroPad(date.getTime() % 1000, 4),
    //             '%F': date.toISOString().slice(0, 10),
    //             '%G': getThursday().getFullYear(),
    //             '%g': ('' + getThursday().getFullYear()).slice(2),
    //             '%H': zeroPad(nHour, 2),
    //             '%I': zeroPad((nHour + 11) % 12 + 1, 2),
    //             '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
    //             '%k': '' + nHour,
    //             '%l': (nHour + 11) % 12 + 1,
    //             '%m': zeroPad(nMonth + 1, 2),
    //             '%M': zeroPad(date.getMinutes(), 2),
    //             '%p': (nHour < 12) ? 'AM' : 'PM',
    //             '%P': (nHour < 12) ? 'am' : 'pm',
    //             '%s': Math.round(date.getTime() / 1000),
    //             '%S': zeroPad(date.getSeconds(), 2),
    //             '%u': nDay || 7,
    //             '%w': '' + nDay,
    //             '%x': date.toLocaleDateString(),
    //             '%X': date.toLocaleTimeString(),
    //             '%y': ('' + nYear).slice(2),
    //             '%Y': nYear,
    //             '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
    //             '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
    //         }[sMatch] || sMatch;
    //     });
    // }
}