import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'Clear',
    },
    extensionApi: "chrome",
    modules: ["@wxt-dev/module-vue"],
});
