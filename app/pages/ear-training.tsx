
import { h, Component } from 'preact';
import { synth } from '../utils/synth';
import { randRange, seedRandom } from '../utils/random';
import { registerComponent, unregisterComponent } from '../utils/urlstate';

type Interval = {
  base: number,
  steps: number
}
const play = ({ base, steps }: Interval) => {
  const volume = 80;
  synth.noteOn("base", base, volume, 3000);
  setTimeout(() => {
    synth.noteOn("top", base + steps, volume, 2000);
  }, 1000)
};

const generate = (seed: number): Interval => {
  seedRandom(seed);
  const steps = randRange(0, 12) + 1;
  const base = randRange(40, 80 - steps) + 1;
  return { base, steps };
}

type State = {
  seed: number
}
export class EarTraining extends Component<{}, State>{
  constructor() {
    super();
    this.state = {
      seed: 1
    }
  }
  componentDidMount() {
    registerComponent('ear', this);
  }

  componentWillUnmount() {
    unregisterComponent('ear');
  }

  next = () => {
    const { seed } = this.state;
    this.setState({ seed: seed + 1 });
  }

  prev = () => {
    const { seed } = this.state;
    this.setState({ seed: seed - 1 });
  }

  onclick = () => {
    const { seed } = this.state;
    const interval = generate(seed);
    play(interval);
  }

  render() {
    const { seed } = this.state;
    const interval = generate(seed);
    return (
      <div>
        <button onClick={this.prev}>&lt;</button>
        <button onClick={this.onclick}>Play {seed}</button>
        <button onClick={this.next}>&gt;</button>
      </div>
    );
  }
} 