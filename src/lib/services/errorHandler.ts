import { toastService } from "@/components";
import type { AxiosError } from "axios";

const errorHandler = (error: AxiosError<{ message?: string }>) => {
  const errorMsg = error.response?.data.message || error.response?.data;
  if (error.response?.status !== 404 && typeof errorMsg === "string" && errorMsg !== "") {
    toastService.error(errorMsg);
    return;
  }

  switch (error.code) {
    case "ERR_NETWORK":
      toastService.error("Conexión rechazada. Asegurese de tener una buena conexión.");
      break;
    case "ERR_BAD_RESPONSE":
      toastService.error("Oops!, error interno.");
      break;
    case "ERR_BAD_REQUEST":
      switch (error.response?.status) {
        case 400:
          toastService.error("Mala solicitud.");
          throw error;
        case 403:
          toastService.error("No tiene permisos para ver este contenido");
          throw error
        case 404:
          throw error;
        default:
          toastService.error("Ha ocurrido un error.");
          throw error;
      }
      break;
    default:
      toastService.error("Ha ocurrido un error.");
      break;
  }
};

export default errorHandler;
