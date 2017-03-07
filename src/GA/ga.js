let instance = null;

class GoogleAnalyticsComponent {

    constructor() {

        // TODO: are options for GA/GTM required, to be confirmed with analysts/clients later on
        const options = {};

        // TODO: have an option of GTM or GA
        // const gtmId = '{{GTM_TRACKER_ID}}';

        // use string-replace-loader to replace the value of GA_TRACKER_ID for your app
        const gaId = '{{GA_TRACKER_ID}}';

        console.log(gtmId);
        console.log(gaId);

        if(!instance){
            instance = this;

            // https://developers.google.com/analytics/devguides/collection/analyticsjs/
            // jscs:disable
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            // TODO: GA/GTM options
            // (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            //     '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            // })(window,document,'script','dataLayer','{{GTM_TRACKER_ID}}');
            // jscs:enable

            if (options && options.gaOptions) {
                ga('create', gaId, options.gaOptions);
            } else {
                ga('create', gaId, 'auto');
            }
            ga('send', 'pageview');

            // TODO: when GTM is enabled - send data via GTM
            // dataLayer.push(data);
        }

        return instance;
    }

    static get instance() {
        if (!instance) {
            instance = new GoogleAnalyticsComponent();
        }
        return instance;
    }

    pageView(path) {
        if (typeof ga === 'function') {
            ga('send', 'pageview', path);

            // TODO: when GTM is enabled - send data via GTM
            // dataLayer.push(data);
        }
    }

    recordEvent(options) {

        if (typeof ga === 'function') {
            var fieldObject = { hitType: 'event' };

            if (options.hasOwnProperty('category'))
                fieldObject.eventCategory = options.category;
            if (options.hasOwnProperty('action'))
                fieldObject.eventAction = options.action;

            ga('send', fieldObject);

            // TODO: when GTM is enabled - send data via GTM
            // dataLayer.push(data);
        }
    }
}

export default GoogleAnalyticsComponent;

