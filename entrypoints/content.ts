import instagram from "./sites/instagram";
import x from "./sites/x";
import youtube from "./sites/youtube";

export default defineContentScript({
    matches: ["*://*.x.com/*", "*://*.instagram.com/*", "*://*.facebook.com/*", "*://*.youtube.com/*"],
    main() {
        const url = new URL(location.href);

        if (url.hostname.endsWith('x.com')) {
            x(url);
        }
        if (url.hostname.endsWith('instagram.com')) {
            instagram(url);
        }
        if (url.hostname.endsWith('facebook.com')) {

        }
        if (url.hostname.endsWith('youtube.com')) {
            youtube(url);
        }
    },
});
