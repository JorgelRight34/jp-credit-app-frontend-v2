import type { ReactNode } from "react";
import { toast } from "react-toastify";

type Message = string | ReactNode;

/**
 * Service class for displaying toast notifications throughout the application.
 * Provides a centralized interface for showing success, error, and info messages.
 */
class Toast {
    /**
     * Displays a success toast notification.
     *
     * @param message - The success message to display to the user
     */
    success(message: Message) {
        toast.success(message);
    }

    /**
     * Displays an error toast notification.
     *
     * @param message - The error message to display to the user
     */
    error(message: Message) {
        toast.error(message);
    }

    /**
     * Displays an informational toast notification.
     *
     * @param message - The informational message to display to the user
     */
    info(message: Message, autoClose?: number) {
        toast.info(message, { autoClose });
    }
}

/**
 * Global toast service instance for displaying notifications.
 * Use this singleton to show toast messages from anywhere in the application.
 */
export const toastService = new Toast();