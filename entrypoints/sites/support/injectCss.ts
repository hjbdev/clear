export default function (css: string) {
    const existingStyle = document.querySelector("style#clear-ext");

    if (existingStyle) {
        return;
    }

    const style = document.createElement("style");
    style.id = "clear-ext";
    style.innerHTML = css;
    document.head.appendChild(style);
}