type t = {
  fontFamily: string,
  fontSize: Browser_dim.t,
  backgroundColor: Color.t,
  color: Color.t,
  lineHeight: Browser_dim.t,
  forceInject: bool,
  iconColorChecked: bool,
  enabled: bool,
  domains: list string,
  isInitialized: bool
};

let defaults = {
  fontFamily: "Courier ",
  fontSize: Browser_dim.Pt 18.0,
  backgroundColor: Color.from_ints 0xfd 0xfc 0xfd 0xff,
  lineHeight: Browser_dim.None 1.5,
  color: Color.{r: 0.0, g: 0.0, b: 0.0, a: 1.0},
  enabled: true,
  forceInject: false,
  iconColorChecked: false,
  domains: [],
  isInitialized: true
};

let storageName = "drcConfig";

let save t => Chrome.store storageName t;

let load () =>
  try (Chrome.retrieve storageName) {
  | Not_found =>
    save defaults;
    defaults
  | exn =>
    Js.log2 "Model.load: " exn;
    defaults
  };
