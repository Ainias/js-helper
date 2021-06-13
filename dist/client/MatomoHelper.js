"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatomoHelper = void 0;
const Helper_1 = require("../shared/Helper");
class MatomoHelper {
    static start(url, siteId, scriptName) {
        scriptName = Helper_1.Helper.nonNull(scriptName, "matomo");
        let _paq = window["_paq"] = window["_paq"] || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        // _paq.push(['trackPageView']);
        // _paq.push(['enableLinkTracking']);
        (function () {
            var u = "//" + url + "/";
            _paq.push(['setTrackerUrl', u + scriptName + '.php']);
            _paq.push(['setSiteId', siteId]);
            var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.src = u + scriptName + '.js';
            s.parentNode.insertBefore(g, s);
        })();
    }
    static log(category, action, name, value) {
        return this.apiCall("trackEvent", ...arguments);
    }
    static apiCall(apiCall, ...args) {
        let _paq = window["_paq"] = window["_paq"] || [];
        _paq.push([apiCall, ...args]);
    }
    static execute(func) {
        let _paq = window["_paq"] = window["_paq"] || [];
        _paq.push([func]);
    }
}
exports.MatomoHelper = MatomoHelper;
//# sourceMappingURL=MatomoHelper.js.map