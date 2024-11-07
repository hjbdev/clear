import injectCss from "./support/injectCss";

export default function youtube(url: URL) {
    if (url.pathname === '/') {
        // No more algorithmic feed
        window.location.href = '/feed/subscriptions';
    }

    let css = `
        #guide-content #sections .ytd-guide-renderer:nth-child(3),
        #guide-content #sections .ytd-guide-renderer:nth-child(4),
        #guide-content #sections .ytd-guide-renderer:nth-child(5),
        a[title="Shorts"],
        a[title="Home"],
        #guide-renderer #footer {
            display: none !important;
        }
    `;

    injectCss(css);
}
