"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XSSHelper {
    static escapeHTML(text) {
        if (typeof text !== "string") {
            return text;
        }
        const MAP = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) {
            return MAP[m];
        });
    }
    static escapeJS(text) {
        if (typeof text !== "string") {
            return text;
        }
        return text.replace(/[<]([\\s]*\\\/?[\\s]*)script([^<]*)[>]/g, function (match, p1, p2) {
            return "&lt;" + p1 + "sc&zwnj;ript" + p2 + "&gt;";
        });
    }
}
exports.XSSHelper = XSSHelper;
//# sourceMappingURL=XSSHelper.js.map