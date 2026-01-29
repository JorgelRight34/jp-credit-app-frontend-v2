import { AxiosError } from "axios";
import { toastService } from "./toastService";

const errorHandler = (error: AxiosError<{ message?: string }>) => {
  const errorMsg = error.response?.data?.message || error.response?.data;
  if (typeof errorMsg === "string" && errorMsg !== "") {
    toastService.error(errorMsg.slice(100));
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
          break;
        case 401:
          alert("debe")
          toastService.error("Debe iniciar sesión.");
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
