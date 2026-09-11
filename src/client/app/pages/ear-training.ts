import { h, signal } from "solid-vanilla";
import { synth } from "../../../common/synth";
import { randRange, seedRandom } from "../../../common/random";
import { parseState, setStateInUrl } from "../../../common/urlstate";

type Interval = {
  base: number;
  steps: number;
};

const play = ({ base, steps }: Interval) => {
  const volume = 80;
  synth.noteOn("base", base, volume, 3000);
  setTimeout(() => {
    synth.noteOn("top", base + steps, volume, 2000);
  }, 1000);
};

const generate = (seed: number): Interval => {
  seedRandom(seed);
  const steps = randRange(0, 12) + 1;
  const base = randRange(40, 80 - steps) + 1;
  return { base, steps };
};

export const EarTraining = (stateJson?: string) => {
  const init = parseState<{ seed: number }>(stateJson);
  const seed = signal(init.seed ?? 1);

  seed.on(() => setStateInUrl("/ear-training", { seed: seed.get() }), true);

  return h("div").inner(
    h("button")
      .attr("type", "button")
      .on("click", () => seed.set(seed.get() - 1))
      .inner("<"),
    h("button")
      .attr("type", "button")
      .on("click", () => play(generate(seed.get())))
      .inner(() => `Play ${seed.get()}`),
    h("button")
      .attr("type", "button")
      .on("click", () => seed.set(seed.get() + 1))
      .inner(">"),
  );
};
