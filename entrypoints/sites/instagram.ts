import injectCss from "./support/injectCss";

export default function (url: URL) {
    stylingTweaks();    
}

function stylingTweaks() {
    let css = `
    div > span > div > a[href*="reels"],
    div > span > div > a[href*="explore"],
    div > span > div > a[href*="threads.net"]
    {
        display: none !important;
    }

    main[role="main"] > div > div:nth-child(2) > div > div:nth-child(2),
    main[role="main"] > div > div:nth-child(2) > div > div:nth-child(3) {
        display: none !important;
    }

    main[role="main"] article 
    `;

    injectCss(css);
}