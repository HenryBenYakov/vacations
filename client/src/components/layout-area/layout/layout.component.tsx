import React from "react";
import { Footer } from "../footer/footer.component";
import { Header } from "../header/header.component";
import { Routing } from "../routing/routing.component";
import "./layout.style.css";

export const Layout: React.FC = () => {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>

      <main>
        <Routing />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
