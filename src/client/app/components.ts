import { h, RNode, signal } from "solid-vanilla";
import { router } from "./routes";

// ---------- Navbar ----------

const pages: Array<[string, string]> = [
  ["Home", "/"],
  ["Worksheet", "/worksheet"],
  ["App", "/app"],
  ["Line Paper", "/line-paper"],
  ["Ear Training", "/ear-training"],
];

const currentPage = () => location.hash.replace(/^#/, "").split("/")[1] ?? "";

export const Navbar = (): RNode => {
  const page = signal("");
  const updatePage = () => page.set(currentPage());
  updatePage();

  const bar = h("nav")
    .cn("no-print")
    .css("margin-bottom", "20px")
    .css("background-color", "#9bc3c8")
    .css("padding", "10px");

  const buttons = pages.map(([name, path]) => {
    const btn = h("button")
      .attr("type", "button")
      .css("cursor", "pointer")
      .css("font-size", "14pt")
      .css("margin", "2px")
      .on("click", () => router.navigate(path))
      .inner(name) as RNode;
    btn.watch(page, () =>
      btn.cn("current", page.get() === path.replace(/^\//, "")),
    );
    return btn;
  });

  const getUrlBtn = h("button")
    .attr("type", "button")
    .css("cursor", "pointer")
    .css("font-size", "14pt")
    .css("margin", "2px")
    .css("float", "right")
    .on("click", () => alert(decodeURI(document.location.href)))
    .inner("Get URL");

  bar.inner(...buttons, getUrlBtn);

  window.addEventListener("hashchange", updatePage);
  bar.onUnmount(() => window.removeEventListener("hashchange", updatePage));

  return bar;
};

// ---------- Numpad ----------

export const key_bs = String.fromCharCode(8592);
export const key_clear = "C";

export const Numpad = (onInput: (c: string) => void): RNode => {
  const container = h("div")
    .css("display", "inline-grid")
    .css("vertical-align", "top")
    .css("grid-template-columns", "repeat(3, 4ch)")
    .css("grid-template-rows", "repeat(4, 4ch)");

  const cell = (c: string) =>
    h("button")
      .attr("type", "button")
      .css("font-size", "40pt")
      .css("text-align", "center")
      .css("margin", "1px")
      .on("click", () => onInput(c))
      .inner(c);

  container.inner(
    cell("7"),
    cell("8"),
    cell("9"),
    cell("4"),
    cell("5"),
    cell("6"),
    cell("1"),
    cell("2"),
    cell("3"),
    cell("0"),
    cell(key_bs),
    cell(key_clear),
  );

  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      onInput(key_clear);
    } else if (key === "Backspace") {
      onInput(key_bs);
    } else if (`${key}`.match(/[0-9]/)) {
      onInput(key);
    }
  };
  window.addEventListener("keydown", onKeydown);
  container.onUnmount(() => window.removeEventListener("keydown", onKeydown));

  return container;
};
