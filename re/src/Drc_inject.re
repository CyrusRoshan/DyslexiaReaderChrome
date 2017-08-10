open Model;

let injectStyle (state: Model.t) => {
  let important =
    if state.forceInject {
      " !important"
    } else {
      ""
    };
  Js.log2 "injectStyle: size adjust: " (string_of_float state.fontSizeAdjust);
  let style =
    "*:not(.drcExempt) { font-family: " ^
    state.fontFamily ^
    important ^
    "; background-color: " ^
    Color.toString state.backgroundColor ^
    important ^
    "; line-height: " ^
    state.lineHeight ^
    important ^
    "; color: " ^
    Color.toString state.color ^
    important ^
    "; };\n*.drc-transform-font-size { color: green; font-size: " ^
    string_of_float state.fontSizeAdjust ^ "em " ^ important ^ "; }\n\n";
  let style =
    style ^
    Printf.sprintf
      {|

.drcOcrExtractedTextOverlay:hover {
  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 0.05em black;
}

.drcOcrExtractedTextOverlay {
  background-color: %s;
  opacity: 1.0;
  line-height: 1em;
  color: %s;
}
  |}
      (Color.toString state.backgroundColor)
      (Color.toString state.color);
  let injectedStyle = Drc_dom.(createElement document "style");
  Drc_dom.setInnerHTML injectedStyle style;
  Drc_dom.(appendChild head injectedStyle)
  /*Chrome.Tabs.makeExecutableScript
      js
      (
        "var injectedStyle = document.createElement('style'); injectedStyle.type = 'text/css'; injectedStyle.className = 'injectedStyle'; injectedStyle.innerHTML = '" ^
        style ^ "' ; document.head.appendChild(injectedStyle);"
      );
    Chrome.(Tabs.(executeScript (tabs chrome) js))*/
};

let rec mark explicitlyPositioned state el => {
  let isPositionedExplicitly el => {
    let computedStyle = Drc_dom.getComputedStyle el;
    let positionType = Drc_dom.Style.get computedStyle "position";
    switch positionType {
    | "static"
    | "absolute"
    | "fixed" => true
    | _ => false
    }
  };
  let isLeaf el => {
    let kids = Drc_dom.children el;
    Drc_dom.Html_collection.length kids == 0
  };
  let isImage el => {
    let isImageTag = String.lowercase (Drc_dom.tagName el) == "img";
    /*let hasImageBackground = {
        let elStyle = Drc_dom.getStyle el;
        let bgImage = Drc_dom.Style.get elStyle "background-image";
        if (String.length bgImage > 1 && String.compare bgImage "initial" != 0) {
          if (String.lowercase (Drc_dom.tagName el) == "a") {
            Js.log2 "Found 'a' element with bg image: " bgImage;
            Js.log2 "BG: " (Drc_dom.Style.get elStyle "background")
          }
        }
      };*/
    isImageTag
  };
  ignore (isImage el);
  if (
    isImage el &&
    Drc_dom.(getArbitraryProperty el "width" != 0 && getArbitraryProperty el "height" != 0)
  ) {
    let img = Drc_dom.(createElement document "img");
    let imgUrl = Drc_dom.getArbitraryProperty el "src";
    Drc_dom.setArbitraryProperty img "src" imgUrl;
    let w = Drc_dom.getArbitraryProperty el "width";
    let h = Drc_dom.getArbitraryProperty el "height";
    /* */
    let imgData = {"url": imgUrl, "width": w, "height": h};
    Drc_dom.doOnLoad
      img
      (
        fun _ =>
          Drc_chrome.(
            Runtime.sendMessage
              (runtime chrome)
              {"ocr": imgData}
              (
                fun (resp: Ocr.detection) => {
                  Js.log2 "Get response: " resp;
                  let text = resp.Ocr.text;
                  let confidence = resp.Ocr.confidence;
                  if (confidence >= 45.0 && Stringy.containsAlpha resp.Ocr.text) {
                    /*let canvas = Drc_dom.(createElement document "canvas");
                      Drc_dom.(setArbitraryProperty canvas "width" w);
                      Drc_dom.(setArbitraryProperty canvas "height" h);
                      let ctx = Drc_dom.Canvas.getContext canvas "2d";
                      Drc_dom.Canvas.Context.drawImage ctx img 0.0 0.0 w h;
                      Array.iter (fun w => Ocr.Word.drawOn w ctx) resp.Ocr.words;*/
                    /* */
                    Js.log2 "Found an image containing text: " text;
                    Js.log2 "Confidence: " confidence;
                    /*let extracted = canvas;*/
                    let extracted = Drc_dom.(createElement document "div");
                    Drc_dom.(setArbitraryProperty extracted "width" w);
                    Drc_dom.(setArbitraryProperty extracted "height" h);
                    Drc_dom.(Style.set (getStyle extracted)) "width" (w ^ "px");
                    Drc_dom.(Style.set (getStyle extracted)) "height" (h ^ "px");
                    let bgUrl = Printf.sprintf "url('%s')" imgUrl;
                    Drc_dom.(Style.set (getStyle extracted)) "background-image" bgUrl;
                    Drc_dom.(Style.set (getStyle extracted) "background-size" "cover");
                    let dropZone = {
                      let el' = Drc_dom.(createElement document "div");
                      Drc_dom.(Style.set (getStyle el')) "width" (w ^ "px");
                      Drc_dom.(Style.set (getStyle el')) "height" (h ^ "px");
                      Drc_dom.(Style.set (getStyle el')) "margin" "0";
                      Drc_dom.(Style.set (getStyle el')) "padding" "0";
                      Drc_dom.(Style.set (getStyle el')) "backgroundColor" "rgba(255,255,255,0.0)";
                      Drc_dom.(Style.set (getStyle el')) "position" "absolute";
                      Drc_dom.(Class_list.(add (classList el') "drcExempt"));
                      Drc_dom.(setArbitraryProperty el' "title" (getArbitraryProperty el "title"));
                      Js.log2 "dropZone: " el';
                      el'
                    };
                    try Drc_dom.(replaceInPlace el extracted) {
                    | exn => Js.log2 "Something went fucky while trying to replace an image: " exn
                    };
                    ignore (Drc_dom.appendChild extracted dropZone);
                    Array.iter
                      (
                        fun word =>
                          if (
                            word.Ocr.Word.confidence >= 67.5 &&
                            Stringy.containsAlpha word.Ocr.Word.text
                          ) {
                            ignore (Ocr.Word.insertInto word dropZone)
                          }
                      )
                      resp.Ocr.words
                  } else {
                    Js.log "Low confidence, skipping."
                  }
                }
              )
          )
      )
  };
  /*toDataUrl
    imgUrl
    (
      fun data => {
        let context = Drc_dom.Canvas.(getContext canvas "2d");
          Drc_dom.Canvas.Context.drawImage context img 0.0 0.0;
          Js.log "About to gray out an image...";
          let sendMsg (x: 'a) :'b => [%bs.raw
            {|
              function (obj) {
                console.log("content script is about to send a message...");
                chrome.runtime.sendMessage(obj);
              }
              |}
          ];
          sendMsg Js.null;
          Drc_dom.Canvas.grayScale img canvas;
          Ocr.ocr
            canvas
            (
              fun resp =>
                if (Ocr.confidence resp > 70) {
                  Js.log2 "Found an image containing text: " (Ocr.text resp);
                  Js.log2 "Confidence: " (Ocr.confidence resp);
                  let extracted = Drc_dom.(createElement document "div");
                  Drc_dom.(setArbitraryProperty extracted "width" (getArbitraryProperty el "width"));
                  let height = Drc_dom.getArbitraryProperty el "height";
                  Drc_dom.(setArbitraryProperty extracted "height" height);
                  Drc_dom.(Style.set (getStyle extracted) "fontSize" (height ^ "px"));
                  Drc_dom.setInnerHTML extracted (Ocr.text resp);
                  Drc_dom.(replaceInPlace el extracted)
                }
            )
      }
    )*/
  if (isPositionedExplicitly el || explicitlyPositioned) {
    ()
  } else if (isLeaf el) {
    Js.log2 "Marking an element." el;
    Drc_dom.(Style.set (getStyle el) "fontSize" (string_of_float state.fontSizeAdjust ^ "em"))
  };
  /*Drc_dom.(Class_list.add (classList el) "drc-transform-font-size")*/
  let kids = Drc_dom.children el;
  List.iter (mark false state) (Drc_dom.Html_collection.toList kids)
};

Model.load injectStyle;

Js.log "Done injecting.";

mark false Model.defaults Drc_dom.body;

mark false Model.defaults Drc_dom.body;
