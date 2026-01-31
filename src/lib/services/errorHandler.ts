import { toastService } from "./toastService";
import type { AxiosError } from "axios";

const errorHandler = (error: AxiosError<{ message?: string }>) => {
  const errorMsg = error.response?.data.message || error.response?.data;
  if (typeof errorMsg === "string" && errorMsg !== "") {
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
      console.log("Error.response.status", error.response?.status)
      console.log("Response", error.response)
      switch (error.response?.status) {
        case 400:
          toastService.error("Mala solicitud.");
          break;
        case 404:
          toastService.error("No encontrado")
          break;
      }
      break;
    default:
      toastService.error("Ha ocurrido un error.");
      break;
  }
};

export default errorHandler;
