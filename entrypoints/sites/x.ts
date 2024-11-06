import { debounce } from "remeda";

export default async function (url: URL) {
    if (!document.cookie.includes("twid=")) {
        console.log("User is not logged in");
        return;
    }

    const debounced = debounce(onPageLoad, {
        waitMs: 100,
    });

    const mutationObserver = new MutationObserver((mutations) => {
        debounced.call();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

function onPageLoad() {
    deAlgorithm();
    removePremiumAd();
    cleanNavigation();
    cleanSidebar();
    stylingTweaks();
}

function stylingTweaks() {
    const existingStyle = document.querySelector("style#clear-ext");

    if (existingStyle) {
        return;
    }

    const style = document.createElement("style");
    style.id = "clear-ext";
    style.textContent = `
    /* Centre the primary column */
    [data-testid="primaryColumn"] {
        margin-left: auto !important;
        margin-right: auto !important;
    }

    header[role="banner"] {
        opacity: 0.2 !important;
        transition: opacity 0.2s ease-in-out !important;
    }

    main[role="main"] > div:first-child {
        width: 100% !important;
    }

    @media(min-width: 1000px) {
        header[role="banner"] {
            position: fixed !important;
            left: 0 !important;
        }
    }

    header[role="banner"]:hover {
        opacity: 1 !important;
    }
    `;

    document.body.appendChild(style);
}

function cleanSidebar() {
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

    // find the sidebar
    document.querySelector('[data-testid="sidebarColumn"]')?.remove();
}

function cleanNavigation() {
    const toRemove = ["Grok", "Communities", "Premium", "Verified Orgs", "Search and explore"];

    const navigation = document.querySelector('nav[aria-label="Primary"]');

    if (!navigation) {
        return;
    }

    toRemove.forEach((item) => {
        navigation.querySelector(`a[aria-label="${item}"]`)?.remove();
    });
}

function removePremiumAd() {
    const premiumAd = document.querySelector('[aria-label="Subscribe to Premium"]');

    if (premiumAd) {
        premiumAd.parentElement?.parentElement?.remove();
        console.log("Removed premium ad");
    }
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
        tabBar.children[0].remove();

        // click the second tab (following)
        const followingTab = tabBar.children[0] as HTMLDivElement;
        followingTab.querySelector("a")?.click();

        console.log("Removed 'For you' tab and clicked 'Following' tab");
        // Delete the entire tab bar
        tabBar.remove();
    }
}
