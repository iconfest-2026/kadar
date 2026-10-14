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

        // Smoothly dismiss AEVYRA preloader
        const preloader = document.getElementById('aevyra-app-preloader');
        if (preloader) {
            preloader.classList.add('preloader-fade-out');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 450);
        }
    },
    progress: {
        color: '#00433e',
    },
});

