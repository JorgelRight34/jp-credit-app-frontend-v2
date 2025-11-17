import { Container, Icon, Image, Subtitle } from "@/components";
import horizontalLogo from "@/public/horizontal-logo.png";
import verticalLogo from "@/public/header.jpg";
import { LoginForm } from "@/features/auth";
import { Metadata } from "next";
import "./login.css";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
};

const Page = () => {
  return (
    <main className="login-background">
      <Container className="login-form flex shadow-sm">
        <aside className="md:p-lg-5 border-end hidden w-6/12 flex-col items-center justify-center p-3 md:flex">
          <section
            className="border-accent rounded-5 flex-col items-center justify-center p-5 shadow-sm"
            style={{ borderWidth: "1px" }}
          >
            <header className="flex-col items-center justify-center p-5">
              <h1 className="text-accent mb-5 text-center">
                Sistema de Crédito Empresarial
              </h1>
              {/* Version info at bottom */}
              <Subtitle className="text-center">
                <small>
                  <Icon icon="info" className="me-2" />
                  Versión 1.0.0
                </small>
              </Subtitle>
            </header>
          </section>
        </aside>
        <section className="p-lg-5 flex w-full flex-col justify-center p-3 md:w-6/12">
          <figure className="flex justify-center">
            <Image
              className="img-fluid mb-3 hidden object-contain md:block"
              src={horizontalLogo}
              alt="header"
            />
            <Image
              className="img-fluid mb-5 block object-contain md:hidden"
              src={verticalLogo}
              alt="header"
            />
          </figure>
          {/* Header section */}
          <header className="mb-3 text-center">
            <Subtitle className="small mb-0">
              Ingresa tus credenciales para acceder al sistema.
            </Subtitle>
          </header>
          <LoginForm />
        </section>
      </Container>
    </main>
  );
};

export default Page;
