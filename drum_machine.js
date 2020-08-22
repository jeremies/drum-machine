class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="display"></div>;
  }
}

class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(function () {
      $("#slider").slider({
        min: 0,
        max: 100,
        value: 0,
        range: "min",
        slide: function (event, ui) {
          console.log(ui.value / 100);
        },
      });
    });
  }

  render() {
    return <div id="slider"></div>;
  }
}

class Switch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="switch">
        <div>{this.props.name}</div>
        <div className="inner-switch">
          <div className="switch-button"></div>
        </div>
      </div>
    );
  }
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="controls">
        <Switch name="Power" />
        <Display />
        <VolumeSlider />
        <Switch name="Bank" />
      </div>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const drum = this.props.drum;
    return (
      <div id="" className="drum-pad">
        {drum.id}
      </div>
    );
  }
}

class PadGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pads = [];
    this.props.drums
      .filter((drum) => drum.bank == "heater")
      .forEach((drum) => pads.push(<DrumPad drum={drum} key={drum.id} />));
    return <div className="pad-grid">{pads}</div>;
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="drum-machine">
        <PadGrid drums={this.props.drums} />
        <Controls />
      </div>
    );
  }
}

const DRUMS = [
  {
    id: "Q",
    name: "Heater 1",
    src: "./audio/Heater-1.mp3",
    bank: "heater",
  },
  {
    id: "W",
    name: "Heater 2",
    src: "./audio/Heater-2.mp3",
    bank: "heater",
  },
  {
    id: "E",
    name: "Heater 3",
    src: "./audio/Heater-3.mp3",
    bank: "heater",
  },
  {
    id: "A",
    name: "Heater 4",
    src: "./audio/Heater-4_1.mp3",
    bank: "heater",
  },
  {
    id: "S",
    name: "Clap",
    src: "./audio/Heater-6.mp3",
    bank: "heater",
  },
  {
    id: "D",
    name: "Open HH",
    src: "./audio/Dsc_Oh.mp3",
    bank: "heater",
  },
  {
    id: "Z",
    name: "Kick n' Hat",
    src: "./audio/Kick_n_Hat.mp3",
    bank: "heater",
  },
  {
    id: "X",
    name: "Kick",
    src: "./audio/RP4_KICK_1.mp3",
    bank: "heater",
  },
  {
    id: "C",
    name: "Closed HH",
    src: "./audio/Cev_H2.mp3",
    bank: "heater",
  },
  {
    id: "Q",
    name: "Chord 1",
    src: "./audio/Chord_1.mp3",
    bank: "smooth-piano",
  },
  {
    id: "W",
    name: "Chord 2",
    src: "./audio/Chord_2.mp3",
    bank: "smooth-piano",
  },
  {
    id: "E",
    name: "Chord 3",
    src: "./audio/Chord_3.mp3",
    bank: "smooth-piano",
  },
  {
    id: "A",
    name: "Shaker",
    src: "./audio/Give_us_a_light.mp3",
    bank: "smooth-piano",
  },
  {
    id: "S",
    name: "Open HH",
    src: "./audio/Dry_Ohh.mp3",
    bank: "smooth-piano",
  },
  {
    id: "D",
    name: "Closed HH",
    src: "./audio/Bld_H1.mp3",
    bank: "smooth-piano",
  },
  {
    id: "Z",
    name: "Punchy Kick",
    src: "./audio/punchy_kick_1.mp3",
    bank: "smooth-piano",
  },
  {
    id: "X",
    name: "Side Stick",
    src: "./audio/side_stick_1.mp3",
    bank: "smooth-piano",
  },
  {
    id: "C",
    name: "Snare",
    src: "./audio/Brk_Snr.mp3",
    bank: "smooth-piano",
  },
];

ReactDOM.render(<DrumMachine drums={DRUMS} />, document.getElementById("root"));
