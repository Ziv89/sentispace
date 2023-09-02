import { createContext, ReactNode, useEffect, useState } from 'react';

interface InstallPromptProviderProps {
    children: ReactNode;
}

interface InstallPromptContextProps {
    promptEvent: BeforeInstallPromptEvent | null;
    promptInstall: () => void;
}

export const InstallPromptContext =
    createContext<InstallPromptContextProps | null>(null);

export const InstallPromptProvider = ({
    children,
}: InstallPromptProviderProps) => {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (
            event: BeforeInstallPromptEvent
        ): void => {
            event.preventDefault();
            setInstallPrompt(event);
        };

        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt
        );

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const promptInstall = async () => {
        if (installPrompt) {
            installPrompt.prompt();
            await installPrompt.userChoice;
            setInstallPrompt(null);
        }
    };

    return (
        <InstallPromptContext.Provider
            value={{ promptEvent: installPrompt, promptInstall }}
        >
            {children}
        </InstallPromptContext.Provider>
    );
};
