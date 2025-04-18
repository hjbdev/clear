import { debounce } from "remeda";
import injectCss from "./support/injectCss";

export default function (url: URL) {
    stylingTweaks();

    const debounced = debounce(deleteAlgorithmicPosts, {
        waitMs: 100,
    });

    const mutationObserver = new MutationObserver(() => {
        debounced.call();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

function deleteAlgorithmicPosts() {
    const post = document.querySelector("article");

    if (!post) {
        return;
    }

    post.parentElement?.parentElement?.addEventListener("scroll", (e) => {
        console.log("Blocking scroll");
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    const posts = Array.from(post.parentElement?.children ?? []);

    console.log("POSTS", posts);

    for (const postIndex in posts) {
        const p = posts[postIndex];
        if (p.tagName === "DIV") {
            clearPostsAfter(postIndex, posts);
            break;
        }
    }
}

// This is a very janky solution because I can't find the infinite scroll stuff yet
function clearPostsAfter(postIndex: string, posts: Element[]) {
    const index = parseInt(postIndex);
    for (let i = index; i < posts.length; i++) {
        posts[i].style.opacity = 0;
        posts[i].style.pointerEvents = "none";
    }
}

function stylingTweaks() {
    let css = `
    a[href*="reels"],
    a[href*="explore"],
    a[href*="threads.net"],
    a[href*="meta.ai"]
    {
        display: none !important;
    }

    main[role="main"] > div > div:nth-child(2) > div > div:nth-child(2),
    main[role="main"] > div > div:nth-child(2) > div > div:nth-child(3) {
        display: none !important;
    }
    `;

    injectCss(css);
}
