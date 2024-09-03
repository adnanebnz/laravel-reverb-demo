import "./bootstrap";
import "../css/app.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { NextUIProvider } from "@nextui-org/react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(
                <NextUIProvider>
                    <App {...props} />
                </NextUIProvider>
            );
            return;
        }

        hydrateRoot(el, <App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
