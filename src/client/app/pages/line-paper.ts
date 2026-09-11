import { h, signal } from "solid-vanilla";
import { parseState } from "../../../common/urlstate";

const size = "30pt";

const blankArray = Object.freeze(Array.from({ length: 26 }));
export const modes = {
  blank: blankArray.map(() => ""),
  letters: blankArray.map((_, i) => String.fromCharCode(i + "a".charCodeAt(0))),
  capitals: blankArray.map((_, i) =>
    String.fromCharCode(i + "A".charCodeAt(0)),
  ),
  numbers: blankArray.map((_, i) => `${i % 10}`),
};

type Mode = keyof typeof modes;

const line = (ch: string) =>
  h("label")
    .css("display", "block")
    .css("text-align", "left")
    .css("border-top", "1px solid black")
    .css("border-bottom", "1px solid black")
    .css("margin", "10px")
    .css("height", size)
    .inner(
      h("div").css("height", "50%").css("border-bottom", "1px dashed black"),
      h("b")
        .css("font-weight", "normal")
        .css("margin-top", "-1.2rem")
        .css("position", "absolute")
        .css("font-family", "Arial")
        .inner(ch),
    );

export const LinePaper = (modeParam?: string) => {
  const init = parseState<{ mode: Mode }>(modeParam);
  const mode = signal<Mode>(
    init.mode && init.mode in modes ? init.mode : "blank",
  );

  const container = h("div").css("font-size", size).css("width", "14in");

  container.watch(mode, () => {
    container.inner(...modes[mode.get()].map(line));
  });

  return container;
};
