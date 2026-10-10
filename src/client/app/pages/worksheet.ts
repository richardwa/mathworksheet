import { h, signal } from "solid-vanilla";
import { rand, pickOne, seedRandom } from "../../../common/random";
import { parseState, setStateInUrl } from "../../../common/urlstate";

const questionCount = 20;

const opApply: Record<string, (a: number, b: number) => number> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => Math.floor(a / Math.max(1, b)),
};

// for division, rewrite the terms so the first term is a multiple of the
// divisor (keeps answers whole), mirroring the /app page's approach
const fixTerms = (op: string, terms: number[]): number[] => {
  if (op !== "/") return terms;
  const [a, b] = terms;
  return [a * b, b];
};

type State = {
  operations: Array<"+" | "-" | "*" | "/">;
  termLengths: number[];
  seed: number;
};

const Field = (num: number) =>
  h("label").css("padding", "0 1ch").inner(num.toLocaleString());

export const Worksheet = (stateJson?: string) => {
  const init = parseState<State>(stateJson);
  const operations = signal<State["operations"]>(init.operations ?? ["+", "-"]);
  const termLengths = signal<number[]>(init.termLengths ?? [2, 2, 2, 1]);
  const seed = signal(init.seed ?? 1);

  const syncUrl = () =>
    setStateInUrl("/worksheet", {
      operations: operations.get(),
      termLengths: termLengths.get(),
      seed: seed.get(),
    });

  const nav = h("div")
    .css("text-align", "center")
    .inner(
      h("button")
        .attr("type", "button")
        .on("click", () => seed.set(seed.get() - 1))
        .inner("<"),
      h("span").inner(() => ` ${seed.get()} `),
      h("button")
        .attr("type", "button")
        .on("click", () => seed.set(seed.get() + 1))
        .inner(">"),
    );

  const container = h("div")
    .css("font-size", "20pt")
    .css("display", "grid")
    .css("grid-template-columns", "auto auto");

  container.watch([seed, operations, termLengths], () => {
    syncUrl();
    seedRandom(seed.get());
    const questions = Array.from({ length: questionCount }, (_, num) => {
      const op = pickOne(...operations.get());
      const terms = fixTerms(
        op,
        termLengths.get().map((size) => rand(size)),
      );
      const ans = terms
        .slice(1)
        .reduce((acc, t, i) => opApply[op](acc, t), terms[0]);

      const exprNodes: Array<ReturnType<typeof Field> | string> = [];
      terms.forEach((term, i) => {
        if (i > 0) exprNodes.push(op);
        exprNodes.push(Field(term));
      });

      return h("span")
        .cn("question")
        .attr("title", `${ans}`)
        .css("display", "block")
        .css("margin", "2ch 1ch")
        .inner(
          h("i")
            .css("font-size", "12pt")
            .css("color", "gray")
            .inner(`${(num + 1).toString().padStart(2, "0")})`),
          ...exprNodes,
          h("b").inner("="),
        );
    });
    container.inner(...questions);
  });

  return h("div").inner(nav, container);
};

// convenient get answers function
// @ts-ignore
window.getAnswers = () => {
  document.querySelectorAll(".question").forEach((v, i) => {
    // @ts-ignore
    console.log(i + 1, v.attributes.title.value);
  });
};
