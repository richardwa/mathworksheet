import { div } from "solid-vanilla";
import { Navbar } from "./components";
import { router } from "./routes";

export const App = () => div().inner(Navbar(), router.getRoot());
