import { debounce } from "remeda";
import injectCss from "./support/injectCss";

export default async function (url: URL) {
    if (!document.cookie.includes("twid=")) {
        console.log("User is not logged in");
        return;
    }

    const debounced = debounce(onMutate, {
        waitMs: 100,
    });

    const mutationObserver = new MutationObserver(() => {
        debounced.call();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });

    stylingTweaks();
}

function onMutate() {
    deAlgorithm();
    moveSearch();
}

function stylingTweaks() {
    let css = `
    /* Centre the primary column */
    [data-testid="primaryColumn"],
    main[role="main"] > div {
        margin-left: auto !important;
        margin-right: auto !important;
    }

    /* Nav */
    header[role="banner"] {
        opacity: 0.2 !important;
        transition: opacity 0.2s ease-in-out !important;
        position: fixed !important;
        left: 0 !important;
    }

    @media (max-width: 768px) {
        /* On small screens, if the nav is fixed, it will overlap with the main container */
        header[role="banner"] {
            position: relative !important;
        }
        header[role="banner"] > div {
            width: 88px !important;
        }
    }

    header[role="banner"] > div > div {
        /* Override X default position:fixed */
        position: relative !important;
    }

    header[role="banner"] > div {
        width: auto !important;
    }

    header[role="banner"]:hover {
        opacity: 1 !important;
    }

    [aria-label="Subscribe to Premium"] {
        display: none !important;
    }

    [data-testid="sidebarColumn"] {
        display: none !important;
    }

    .clear-ext-delete {
        display: none !important;
    }

    /* Hide the text on the sidebar links (icon only) */
    nav[aria-label="Primary"] > a > div > div:nth-child(2),
    nav[aria-label="Primary"] > button > div > div:nth-child(2) {
        display: none !important;
    }

    /* Make the navigation as small as possible */
    header[role="banner"] > div > div > div {
        width: auto !important;
    }

    /* Hide the new tweet button in the sidebar */
    div:has(>a[data-testid="SideNav_NewTweet_Button"]) {
        display: none !important;
    }

    /* Keep the account switcher as icon only */
    [data-testid="SideNav_AccountSwitcher_Button"] > div:nth-child(2),
    [data-testid="SideNav_AccountSwitcher_Button"] > div:nth-child(3) {
        display: none !important;
    }
    `;

    ["Grok", "Communities", "Premium", "Verified Orgs", "Search and explore", "Jobs"].forEach((item) => {
        css += `
        a[aria-label="${item}"] {
            display: none !important;
        }
        `;
    });

    injectCss(css);
}

function moveSearch() {
    // check if search form already exists in primaryColumn
    const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');

    if (!primaryColumn) {
        return;
    }

    if (primaryColumn.querySelector('form[role="search"]')) {
        return;
    }

    // find the search form
    const searchForm = document.querySelector('form[role="search"]');

    if (!searchForm) {
        return;
    }

    // delete the original search form
    searchForm.remove();

    // insert it above the tweet form
    const div = document.createElement("div");
    div.appendChild(searchForm);
    div.style.paddingTop = "10px";
    div.style.paddingBottom = "10px";
    div.style.zIndex = "20";
    div.style.position = "relative";

    primaryColumn?.insertBefore(div, primaryColumn.firstChild);
}

function deAlgorithm() {
    const homeTab: HTMLAnchorElement | null = document.querySelector('a[href="/home"][role="tab"]');

    if (!homeTab) {
        return;
    }

    const tabBar = homeTab.parentElement?.parentElement;

    if (!tabBar) {
        return;
    }

    // delete the first tab (for you)
    if (tabBar.children[0]?.textContent?.includes("For you")) {
        // click the second tab (following)
        const followingTab = tabBar.children[1] as HTMLDivElement;
        followingTab.querySelector("a")?.click();

        console.log("Removed 'For you' tab and clicked 'Following' tab");
    }

    tabBar.classList.add("clear-ext-delete");
    // return tabBar.
}
