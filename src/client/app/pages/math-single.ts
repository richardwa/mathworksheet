import { h, signal } from "solid-vanilla";
import { rand, pickOne, seedRandom } from "../../../common/random";
import { parseState, setStateInUrl } from "../../../common/urlstate";
import { Numpad, key_bs, key_clear } from "../components";

type OpReturn = {
  symbol: string;
  term1: number;
  term2: number;
  answer: number;
};

const operations = {
  "+": (a: number, b: number): OpReturn => ({
    symbol: "+",
    term1: a,
    term2: b,
    answer: a + b,
  }),
  "-": (a: number, b: number): OpReturn => ({
    symbol: "-",
    term1: a,
    term2: b,
    answer: a + b,
  }),
  "*": (a: number, b: number): OpReturn => ({
    symbol: "\u00D7",
    term1: a,
    term2: b,
    answer: a * b,
  }),
  "/": (a: number, b: number): OpReturn => ({
    symbol: "\u00F7",
    term1: a * b,
    term2: b,
    answer: b,
  }),
};

type State = {
  operation: Array<keyof typeof operations>;
  len1: number;
  len2: number;
  seed: number;
};

export const MathApp = (stateJson?: string) => {
  const init = parseState<State>(stateJson);
  const operation = signal<State["operation"]>(init.operation ?? ["+"]);
  const len1 = signal(init.len1 ?? 4);
  const len2 = signal(init.len2 ?? 4);
  const seed = signal(init.seed ?? 1);
  const input = signal("");

  let answerLength = 10;
  let exprAnswer = NaN;

  const syncUrl = () =>
    setStateInUrl("/app", {
      operation: operation.get(),
      len1: len1.get(),
      len2: len2.get(),
      seed: seed.get(),
    });

  // seed navigation
  const seedNav = h("div").inner(
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

  // next button shows CORRECT! when the input matches the answer
  const nextButton = h("button")
    .attr("type", "button")
    .css("font-size", "40pt")
    .css("height", "calc(4ch - 2px)")
    .css("width", "100%")
    .css("display", "block")
    .on("click", () => {
      seed.set(seed.get() + 1);
      input.set("");
    });
  nextButton.watch(input, () => {
    const correct = exprAnswer === parseInt(`${input.get()}`);
    nextButton
      .css("color", correct ? "green" : "")
      .inner(h("b").inner(correct ? "CORRECT!" : "skip"));
  });

  // question box, rebuilt whenever the problem changes
  const questionBox = h("div").css("margin-top", "1ch");
  const answerLabel = h("label")
    .css("display", "block")
    .css("padding-right", "0.5ch")
    .css("height", "2ch")
    .css("text-align", "right");
  answerLabel.watch(input, () =>
    answerLabel.inner(
      input.get() ? parseInt(input.get()).toLocaleString() : "",
    ),
  );

  const leftBox = h("div")
    .css("display", "inline-block")
    .css("width", "10ch")
    .css("margin", "0 1ch 1ch 1ch")
    .inner(nextButton, questionBox);

  const rebuild = () => {
    syncUrl();
    seedRandom(seed.get());
    const op = pickOne(...operation.get());
    const expr = operations[op](rand(len1.get()), rand(len2.get()));
    exprAnswer = expr.answer;
    answerLength = `${expr.answer}`.length;

    const label = (text: string) =>
      h("label")
        .css("display", "block")
        .css("padding-right", "0.5ch")
        .css("height", "2ch")
        .css("text-align", "right")
        .inner(text);

    questionBox.inner(
      label(` ${expr.term1.toLocaleString()} `),
      label(`${expr.symbol} ${expr.term2.toLocaleString()}`),
      h("hr"),
      answerLabel,
    );
  };
  questionBox.watch([seed, operation, len1, len2], rebuild);

  const onInput = (key: string) => {
    const current = input.get();
    if (key === key_clear) {
      input.set("");
    } else if (key === key_bs) {
      input.set(current.substring(0, current.length - 1));
    } else {
      input.set(`${current}${key}`.substring(0, answerLength || 10));
    }
  };

  return h("div")
    .css("font-size", "40pt")
    .css("display", "flex")
    .css("flex-direction", "row")
    .css("justify-content", "center")
    .css("flex-wrap", "wrap")
    .inner(seedNav, leftBox, Numpad(onInput));
};
