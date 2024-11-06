import injectCss from "./support/injectCss";

export default function youtube(url: URL) {
    let css = `
        #guide-content #sections .ytd-guide-renderer:nth-child(3),
        #guide-content #sections .ytd-guide-renderer:nth-child(4),
        #guide-content #sections .ytd-guide-renderer:nth-child(5),
        a[title="Shorts"] {
            display: none !important;
        }
    `;

    injectCss(css);
}