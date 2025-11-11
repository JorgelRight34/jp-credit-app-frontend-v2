import LoginForm from "@/features/Auth/pages/LoginForm";
import { LOGOS } from "../../utils/constants";
import "./login.css";

const LoginPage = () => {
  return (
    <div className="login-background">
      <div className="login-form flex bg-white rounded-3 shadow-sm">
        <div className="md: w-6/12 p-3 p-lg-5 hidden md:flex flex-col items-center justify-center border-end">
          <div
            className="border-accent rounded-5 shadow-sm p-5 flex-col items-center justify-center"
            style={{ borderWidth: "1px" }}
          >
            <div className="p-5 flex-col items-center justify-center">
              <h1 className="text-center text-accent mb-5">
                Sistema de Crédito Empresarial
              </h1>
              {/* Version info at bottom */}
              <div className="text-center text-muted">
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  Versión 1.0.0
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12 p-3 p-lg-5 flex flex-col justify-center ">
          <div className="flex justify-center">
            <img
              className="img-fluid object-contain mb-3 hidden md:block"
              src={LOGOS.horizontal}
              alt="header"
            />
            <img
              className="img-fluid object-contain mb-5 block md:hidden"
              src={LOGOS.vertical}
              alt="header"
            />
          </div>
          {/* Header section */}
          <div className="text-center mb-3">
            <p className="text-muted small mb-0">
              Ingresa tus credenciales para acceder al sistema.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
