import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { interceptorService } from "./services/interceptor-service";
import { Layout } from "./components/layout-area/layout/layout.component";
import "./index.css";

interceptorService.createInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
