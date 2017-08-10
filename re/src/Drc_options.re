let makeUpdateFunction el (coerce: Model.t => 'a => 'b) => {
  let handler () => {
    let value = Drc_dom.getArbitraryProperty el "value";
    Model.load (
      fun state => {
        Js.log2 "State: " state;
        Js.log2 "Updating with a value: " value;
        let state' = coerce state value;
        Model.save state';
        state'
      }
    )
  };
  Drc_dom.doOnInput el handler;
  Drc_dom.doOnBlur el handler
};

external dom : Dom.element = "document" [@@bs.val];

external getById : Dom.element => string => Dom.element = "getElementById" [@@bs.send];

Drc_dom.(doOnLoad body) (
  fun () => {
    /*let () = {
        open Model;
        makeUpdateFunction
          (Drc_dom.(getElementById document) "fontFamily")
          (fun model s => {...model, fontFamily: s});
        makeUpdateFunction
          (Drc_dom.(getElementById document) "fontSize")
          (fun model s => {...model, fontSizeAdjust: s});
        makeUpdateFunction
          (Drc_dom.(getElementById document) "backgroundColor")
          (fun model s => {...model, backgroundColor: s});
        makeUpdateFunction
          (Drc_dom.(getElementById document) "lineHeight")
          (fun model s => {...model, lineHeight: Browser_dim.(toString (Em (s /. 100.0)))});
        makeUpdateFunction
          (Drc_dom.(getElementById document) "color") (fun model s => {...model, color: s})
      };*/
    let reactTarget: Dom.element = getById dom "optionContainer";
    ignore (Model.load (fun state => ReactDOMRe.render <DrcOptionsForm state /> reactTarget));
    ()
  }
);
