import {Helper} from "../shared/Helper";

export class MatomoHelper {
    static start(url: string, siteId: number, scriptName?: string) {
        scriptName = Helper.nonNull(scriptName, "matomo")

        let _paq = window["_paq"] = window["_paq"] || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function () {
            var u = url + "/";
            _paq.push(['setTrackerUrl', u + scriptName+'.php']);
            _paq.push(['setSiteId', siteId]);
            var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.src = u + scriptName+'.js';
            s.parentNode.insertBefore(g, s);
        })();
    }

    static log(category: string, action: string, name?: string, value?: string) {
        return this.apiCall("trackEvent", ...arguments)
    }

    static apiCall(apiCall: string, ...args) {
        let _paq = window["_paq"] = window["_paq"] || [];
        _paq.push([apiCall, ...args]);
    }

    static execute(func: () => any) {
        let _paq = window["_paq"] = window["_paq"] || [];
        _paq.push([func]);
    }
}
