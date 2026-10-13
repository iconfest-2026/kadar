import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import PwaInstallPrompt from './Components/PwaInstallPrompt';

createInertiaApp({
    title: (title) => (title ? `${title}` : 'AEVYRA - Personal Preventive Health & Early Intervention Platform'),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page = pages[`./Pages/${name}.jsx`];
        if (!page) {
            throw new Error(`Page ${name} not found in ./Pages`);
        }
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <App {...props} />
                <PwaInstallPrompt />
            </>
        );
    },
    progress: {
        color: '#00433e',
    },
});

