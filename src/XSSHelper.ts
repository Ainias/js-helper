export class XSSHelper {
    static escapeHTML(text: any) {
        if (typeof text !== "string"){
            return text
        }

        const MAP = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function (m) {
            return MAP[m as keyof typeof MAP];
        });
    }

    static escapeJS(text: any) {
        if (typeof text !== "string"){
            return text
        }

        return text.replace(/[<]([\\s]*\\\/?[\\s]*)script([^<]*)[>]/g, function (match, p1, p2) {
            return "&lt;"+p1+"sc&zwnj;ript"+p2+"&gt;";
        });
    }
}
