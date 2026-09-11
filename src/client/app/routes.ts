import { HashRouter, div } from "solid-vanilla";
import { Welcome } from "./pages/welcome";
import { Worksheet } from "./pages/worksheet";
import { MathApp } from "./pages/math-single";
import { LinePaper } from "./pages/line-paper";
import { EarTraining } from "./pages/ear-training";

const root = div().css("height", "100%").css("width", "100%");

const router = new HashRouter(root);

router.addRoute("/", () => Welcome());
router.addRoute("/worksheet", () => Worksheet());
router.addRoute("/worksheet/:state", (params) => Worksheet(params.state));
router.addRoute("/app", () => MathApp());
router.addRoute("/app/:state", (params) => MathApp(params.state));
router.addRoute("/line-paper", () => LinePaper());
router.addRoute("/line-paper/:mode", (params) => LinePaper(params.mode));
router.addRoute("/ear-training", () => EarTraining());

export { router };
