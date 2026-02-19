import type { ReactNode } from "react";
import { toast } from "react-toastify";
import SnackbarSuccess from "../components/snackbar-success";
import SnackbarError from "../components/snackbar-error";

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
    success(title: Message) {
        toast(SnackbarSuccess, {
            data: { title },
            // remove the padding on the toast wrapper
            // make it 400px width
            // add a thin purple border because I like purple
            className: 'p-0 w-[400px] border',
        });
    }

    /**
     * Displays an error toast notification.
     *
     * @param message - The error message to display to the user
     */
    error(title: Message) {
        toast.error(SnackbarError, {
            data: { title },
            className: 'p-0 w-[400px] border',
        });
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