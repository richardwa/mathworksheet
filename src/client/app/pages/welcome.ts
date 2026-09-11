import { h } from "solid-vanilla";
import { modes } from "./line-paper";

const container = () => h("div").css("font-size", "18pt").css("margin", "10px");

const link = (href: string) =>
  h("a").attr("href", href).css("text-decoration", "none");

const worksheetState = (operations: string[], termLengths: number[]) =>
  JSON.stringify({ operations, termLengths, seed: 1 });

const appState = (operation: string[], len1: number, len2: number) =>
  JSON.stringify({ operation, len1, len2, seed: 1 });

export const Welcome = () => {
  const root = container();

  const printouts = [
    link(`#/worksheet/${worksheetState(["+", "-"], [2, 2, 2, 1])}`).inner(
      "add/subtract",
    ),
    link(`#/worksheet/${worksheetState(["*"], [2, 1])}`).inner("times"),
    ...Object.keys(modes).map((mode) =>
      link(`#/line-paper/${mode}`).inner(`line paper - ${mode}`),
    ),
  ];
  const onlineApp = [
    link(`#/app/${appState(["+"], 4, 4)}`).inner("addition"),
    link(`#/app/${appState(["+", "-"], 4, 4)}`).inner("add/subtract"),
    link(`#/app/${appState(["*"], 2, 1)}`).inner("times"),
  ];

  root.inner(
    h("h1").inner("Math World"),
    h("h2").inner("Print outs"),
    h("ul").inner(...printouts.map((a) => h("li").inner(a))),
    h("h2").inner("Online App"),
    h("ul").inner(...onlineApp.map((a) => h("li").inner(a))),
  );

  return root;
};
