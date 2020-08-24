var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Display = function (_React$Component) {
  _inherits(Display, _React$Component);

  function Display(props) {
    _classCallCheck(this, Display);

    return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
  }

  _createClass(Display, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "display", className: "display" },
        this.props.display
      );
    }
  }]);

  return Display;
}(React.Component);

var VolumeSlider = function (_React$Component2) {
  _inherits(VolumeSlider, _React$Component2);

  function VolumeSlider(props) {
    _classCallCheck(this, VolumeSlider);

    return _possibleConstructorReturn(this, (VolumeSlider.__proto__ || Object.getPrototypeOf(VolumeSlider)).call(this, props));
  }

  _createClass(VolumeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $(function () {
        $("#slider").slider({
          min: 0,
          max: 100,
          value: this.props.volume,
          range: "min",
          slide: function (event, ui) {
            this.props.onChange(ui.value);
          }.bind(this)
        });
      }.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", { id: "slider" });
    }
  }]);

  return VolumeSlider;
}(React.Component);

var Switch = function (_React$Component3) {
  _inherits(Switch, _React$Component3);

  function Switch(props) {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));
  }

  _createClass(Switch, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "switch" },
        React.createElement(
          "div",
          null,
          this.props.name
        ),
        React.createElement(
          "div",
          { className: "inner-switch", onClick: this.props.onClick },
          React.createElement("div", {
            className: "switch-button " + (this.props.value ? "right" : "")
          })
        )
      );
    }
  }]);

  return Switch;
}(React.Component);

var Controls = function (_React$Component4) {
  _inherits(Controls, _React$Component4);

  function Controls(props) {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));
  }

  _createClass(Controls, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "controls" },
        React.createElement(Switch, {
          name: "Power",
          value: this.props.isOn,
          onClick: this.props.onPowerClick
        }),
        React.createElement(Display, { display: this.props.display }),
        React.createElement(VolumeSlider, {
          volume: this.props.volume,
          onChange: this.props.onVolumeChange
        }),
        React.createElement(Switch, {
          name: "Bank",
          onClick: this.props.onBankClick,
          value: this.props.bank == "smooth-piano"
        })
      );
    }
  }]);

  return Controls;
}(React.Component);

var DrumPad = function (_React$Component5) {
  _inherits(DrumPad, _React$Component5);

  function DrumPad(props) {
    _classCallCheck(this, DrumPad);

    var _this5 = _possibleConstructorReturn(this, (DrumPad.__proto__ || Object.getPrototypeOf(DrumPad)).call(this, props));

    _this5.handleClick = _this5.handleClick.bind(_this5);
    return _this5;
  }

  _createClass(DrumPad, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.play();
    }
  }, {
    key: "play",
    value: function play() {
      if (!this.props.isOn) {
        return;
      }

      var audio = $("#" + this.props.drum.id)[0];
      $(audio.parentElement).effect("highlight", {}, 100);
      audio.volume = this.props.volume / 100;
      audio.play();
      this.props.onDisplayChange(this.props.drum.name);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount(e) {
      $(document).keypress(function (e) {
        if (e.key.toUpperCase() == this.props.drum.id) {
          this.play();
        }
      }.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var drum = this.props.drum;
      return React.createElement(
        "div",
        {
          id: drum.name.replace(/ /g, "-"),
          className: "drum-pad",
          onClick: this.handleClick
        },
        drum.id,
        React.createElement("audio", { src: drum.src, id: drum.id, className: "clip" })
      );
    }
  }]);

  return DrumPad;
}(React.Component);

var PadGrid = function (_React$Component6) {
  _inherits(PadGrid, _React$Component6);

  function PadGrid(props) {
    _classCallCheck(this, PadGrid);

    return _possibleConstructorReturn(this, (PadGrid.__proto__ || Object.getPrototypeOf(PadGrid)).call(this, props));
  }

  _createClass(PadGrid, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var pads = [];
      this.props.drums.filter(function (drum) {
        return drum.bank == _this7.props.bank;
      }).forEach(function (drum) {
        return pads.push(React.createElement(DrumPad, {
          drum: drum,
          key: drum.id,
          volume: _this7.props.volume,
          onDisplayChange: _this7.props.onDisplayChange,
          isOn: _this7.props.isOn
        }));
      });
      return React.createElement(
        "div",
        { className: "pad-grid" },
        pads
      );
    }
  }]);

  return PadGrid;
}(React.Component);

var DrumMachine = function (_React$Component7) {
  _inherits(DrumMachine, _React$Component7);

  function DrumMachine(props) {
    _classCallCheck(this, DrumMachine);

    var _this8 = _possibleConstructorReturn(this, (DrumMachine.__proto__ || Object.getPrototypeOf(DrumMachine)).call(this, props));

    _this8.onDisplayChange = _this8.onDisplayChange.bind(_this8);
    _this8.onBankClick = _this8.onBankClick.bind(_this8);
    _this8.onVolumeChange = _this8.onVolumeChange.bind(_this8);
    _this8.onPowerClick = _this8.onPowerClick.bind(_this8);
    _this8.state = { volume: 40, isOn: true, bank: "heater", display: "" };
    return _this8;
  }

  _createClass(DrumMachine, [{
    key: "onDisplayChange",
    value: function onDisplayChange(text) {
      this.setState({ display: text });
    }
  }, {
    key: "onBankClick",
    value: function onBankClick() {
      var _this9 = this;

      if (this.state.isOn == false) {
        return;
      }

      this.setState(function (state) {
        return {
          bank: state.bank == "heater" ? "smooth-piano" : "heater"
        };
      }, function () {
        var bank = _.startCase(_.toLower(_this9.state.bank.replace("-", " ") + " kit"));
        _this9.onDisplayChange(bank);
      });
    }
  }, {
    key: "onVolumeChange",
    value: function onVolumeChange(volume) {
      this.setState({ volume: volume });
      this.onDisplayChange("Volume: " + volume);
    }
  }, {
    key: "onPowerClick",
    value: function onPowerClick() {
      var _this10 = this;

      this.setState(function (state) {
        return {
          isOn: !state.isOn
        };
      }, function () {
        _this10.onDisplayChange(_this10.state.isOn ? "ON" : "OFF");
        $("#slider").slider("option", "disabled", !_this10.state.isOn);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "drum-machine" },
        React.createElement(
          "div",
          { "class": "title-box" },
          React.createElement(
            "div",
            { "class": "title" },
            "Drum Machine"
          ),
          React.createElement(
            "div",
            { "class": "subtitle" },
            React.createElement(
              "div",
              null,
              "by jeremies"
            ),
            React.createElement(
              "a",
              { href: "https://github.com/jeremies/drum-machine", target: "_blank" },
              React.createElement("i", { "class": "fa fa-fw fa-github fa-2x" })
            )
          )
        ),
        React.createElement(PadGrid, {
          volume: this.state.volume,
          isOn: this.state.isOn,
          bank: this.state.bank,
          drums: this.props.drums,
          onDisplayChange: this.onDisplayChange
        }),
        React.createElement(Controls, {
          volume: this.state.volume,
          isOn: this.state.isOn,
          bank: this.state.bank,
          display: this.state.display,
          onBankClick: this.onBankClick,
          onVolumeChange: this.onVolumeChange,
          onPowerClick: this.onPowerClick
        })
      );
    }
  }]);

  return DrumMachine;
}(React.Component);

var DRUMS = [{
  id: "Q",
  name: "Heater 1",
  src: "./audio/Heater-1.mp3",
  bank: "heater"
}, {
  id: "W",
  name: "Heater 2",
  src: "./audio/Heater-2.mp3",
  bank: "heater"
}, {
  id: "E",
  name: "Heater 3",
  src: "./audio/Heater-3.mp3",
  bank: "heater"
}, {
  id: "A",
  name: "Heater 4",
  src: "./audio/Heater-4_1.mp3",
  bank: "heater"
}, {
  id: "S",
  name: "Clap",
  src: "./audio/Heater-6.mp3",
  bank: "heater"
}, {
  id: "D",
  name: "Open HH",
  src: "./audio/Dsc_Oh.mp3",
  bank: "heater"
}, {
  id: "Z",
  name: "Kick n' Hat",
  src: "./audio/Kick_n_Hat.mp3",
  bank: "heater"
}, {
  id: "X",
  name: "Kick",
  src: "./audio/RP4_KICK_1.mp3",
  bank: "heater"
}, {
  id: "C",
  name: "Closed HH",
  src: "./audio/Cev_H2.mp3",
  bank: "heater"
}, {
  id: "Q",
  name: "Chord 1",
  src: "./audio/Chord_1.mp3",
  bank: "smooth-piano"
}, {
  id: "W",
  name: "Chord 2",
  src: "./audio/Chord_2.mp3",
  bank: "smooth-piano"
}, {
  id: "E",
  name: "Chord 3",
  src: "./audio/Chord_3.mp3",
  bank: "smooth-piano"
}, {
  id: "A",
  name: "Shaker",
  src: "./audio/Give_us_a_light.mp3",
  bank: "smooth-piano"
}, {
  id: "S",
  name: "Open HH",
  src: "./audio/Dry_Ohh.mp3",
  bank: "smooth-piano"
}, {
  id: "D",
  name: "Closed HH",
  src: "./audio/Bld_H1.mp3",
  bank: "smooth-piano"
}, {
  id: "Z",
  name: "Punchy Kick",
  src: "./audio/punchy_kick_1.mp3",
  bank: "smooth-piano"
}, {
  id: "X",
  name: "Side Stick",
  src: "./audio/side_stick_1.mp3",
  bank: "smooth-piano"
}, {
  id: "C",
  name: "Snare",
  src: "./audio/Brk_Snr.mp3",
  bank: "smooth-piano"
}];

ReactDOM.render(React.createElement(DrumMachine, { drums: DRUMS }), document.getElementById("root"));