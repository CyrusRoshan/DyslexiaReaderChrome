type t = {
  fontFamily: string,
  fontSizeAdjust: float,
  backgroundColor: Color.t,
  color: Color.t,
  lineHeight: string,
  forceInject: bool,
  iconColorChecked: bool,
  enabled: bool,
  domains: array string,
  isInitialized: bool
};

let fontFamily t => t.fontFamily;

let fontSizeAdjust t => t.fontSizeAdjust;

let backgroundColor t => t.backgroundColor;

let color t => t.color;

let lineHeight t => t.lineHeight;

let forceInject t => t.forceInject;

let iconColorChecked t => t.iconColorChecked;

let enabled t => t.enabled;

let domains t => t.domains;

let isInitialized t => t.isInitialized;

let defaults = {
  fontFamily: "Courier ",
  fontSizeAdjust: 1.75,
  backgroundColor: Color.from_ints 0xfd 0xfc 0xfd 0xff,
  lineHeight: Browser_dim.(toString (Em 1.5)),
  color: Color.{r: 0.0, g: 0.0, b: 0.0, a: 1.0},
  enabled: true,
  forceInject: true,
  iconColorChecked: false,
  domains: [||],
  isInitialized: true
};

let storageName = "drcConfig";

let save t => Drc_chrome.store storageName t;

let load callback => Drc_chrome.retrieve storageName callback;
