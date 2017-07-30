open Model;

let injectStyle (state: Model.t) => {
  let important =
    if state.forceInject {
      " !important"
    } else {
      ""
    };
  let js = [%bs.raw "{}"];
  Js.log2 "injectStyle: size adjust: " (Browser_dim.toString state.fontSize);
  Chrome.Tabs.makeExecutableScript
    js
    (
      "var injectedStyle = document.createElement('style');" ^
      "injectedStyle.type = 'text/css';" ^
      "injectedStyle.className = 'injectedStyle';" ^
      "injectedStyle.innerHTML = '* { font-family: " ^
      state.fontFamily ^
      important ^
      "; background-color: " ^
      Color.toString state.backgroundColor ^
      important ^
      "; line-height: " ^
      Browser_dim.toString state.lineHeight ^
      important ^
      "; color: " ^
      Color.toString state.color ^
      important ^
      "; };" ^
      ".drc-transform-font-size { font-size: " ^
      Browser_dim.toString state.fontSize ^
      important ^ "}';" ^ "document.head.appendChild(injectedStyle);"
    );
  Chrome.(Tabs.(executeScript (tabs chrome) js))
};

let rec mark el => {
  let isPositionedExplicitly = {
    let computedStyle = Drc_dom.getComputedStyle el;
    let positionType = Drc_dom.Style.get computedStyle "position";
    switch positionType {
    | "absolute"
    | "fixed" => true
    | _ => false
    }
  };
  if (not isPositionedExplicitly) {
    Drc_dom.(Class_list.add (classList el) "drc-transform-font-size")
  };
  let kids = Drc_dom.children el;
  List.iter (fun el' => mark el') (Drc_dom.Html_collection.toList kids)
};
