class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="display" className="display">
        {this.props.display}
      </div>
    );
  }
}

class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(
      function () {
        $("#slider").slider({
          min: 0,
          max: 100,
          value: this.props.volume,
          range: "min",
          slide: function (event, ui) {
            this.props.onChange(ui.value);
          }.bind(this),
        });
      }.bind(this)
    );
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
        <div className="inner-switch" onClick={this.props.onClick}>
          <div
            className={`switch-button ${this.props.value ? "right" : ""}`}
          ></div>
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
        <Switch
          name="Power"
          value={this.props.isOn}
          onClick={this.props.onPowerClick}
        />
        <Display display={this.props.display} />
        <VolumeSlider
          volume={this.props.volume}
          onChange={this.props.onVolumeChange}
        />
        <Switch
          name="Bank"
          onClick={this.props.onBankClick}
          value={this.props.bank == "smooth-piano"}
        />
      </div>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.play();
  }

  play() {
    if (!this.props.isOn) {
      return;
    }

    let audio = $(`#${this.props.drum.id}`)[0];
    $(audio.parentElement).effect("highlight", {}, 100);
    audio.volume = this.props.volume / 100;
    audio.play();
    this.props.onDisplayChange(this.props.drum.name);
  }

  componentDidMount(e) {
    $(document).keypress(
      function (e) {
        if (e.key.toUpperCase() == this.props.drum.id) {
          this.play();
        }
      }.bind(this)
    );
  }

  render() {
    const drum = this.props.drum;
    return (
      <div
        id={drum.name.replace(/ /g, "-")}
        className="drum-pad"
        onClick={this.handleClick}
      >
        {drum.id}
        <audio src={drum.src} id={drum.id} className="clip" />
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
      .filter((drum) => drum.bank == this.props.bank)
      .forEach((drum) =>
        pads.push(
          <DrumPad
            drum={drum}
            key={drum.id}
            volume={this.props.volume}
            onDisplayChange={this.props.onDisplayChange}
            isOn={this.props.isOn}
          />
        )
      );
    return <div className="pad-grid">{pads}</div>;
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.onDisplayChange = this.onDisplayChange.bind(this);
    this.onBankClick = this.onBankClick.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onPowerClick = this.onPowerClick.bind(this);
    this.state = { volume: 40, isOn: true, bank: "heater", display: "" };
  }

  onDisplayChange(text) {
    this.setState({ display: text });
  }

  onBankClick() {
    if (this.state.isOn == false) {
      return;
    }

    this.setState(
      (state) => ({
        bank: state.bank == "heater" ? "smooth-piano" : "heater",
      }),
      () => {
        let bank = _.startCase(
          _.toLower(this.state.bank.replace("-", " ") + " kit")
        );
        this.onDisplayChange(bank);
      }
    );
  }

  onVolumeChange(volume) {
    this.setState({ volume: volume });
    this.onDisplayChange("Volume: " + volume);
  }

  onPowerClick() {
    this.setState(
      (state) => ({
        isOn: !state.isOn,
      }),
      () => {
        this.onDisplayChange(this.state.isOn ? "ON" : "OFF");
        $("#slider").slider("option", "disabled", !this.state.isOn);
      }
    );
  }

  render() {
    return (
      <div id="drum-machine">
        <div class="title-box">
          <div class="title">Drum Machine</div>
          <div class="subtitle">
            <div>by jeremies</div>
            <a href="https://github.com/jeremies/drum-machine" target="_blank">
              <i class="fa fa-fw fa-github fa-2x"></i>
            </a>
          </div>
        </div>
        <PadGrid
          volume={this.state.volume}
          isOn={this.state.isOn}
          bank={this.state.bank}
          drums={this.props.drums}
          onDisplayChange={this.onDisplayChange}
        />
        <Controls
          volume={this.state.volume}
          isOn={this.state.isOn}
          bank={this.state.bank}
          display={this.state.display}
          onBankClick={this.onBankClick}
          onVolumeChange={this.onVolumeChange}
          onPowerClick={this.onPowerClick}
        />
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
