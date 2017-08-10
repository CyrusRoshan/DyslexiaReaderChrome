type componentState = Model.t;

let component = ReasonReact.statefulComponent "DrcOptionsForm";

let make ::state _children => {
  let handleUpdate (coerce, el, conv) event _self => {
    Js.log2 "Got event: " event;
    let el = Drc_dom.(getElementById document el);
    let value = conv (Drc_dom.Input.getValue el);
    Js.log2 "Got value: " (conv (Drc_dom.Input.getValue el));
    /*let value = Drc_dom.Input.getValue el;
      let state' = modify state value;*/
    let state' = coerce value state;
    Model.save state';
    ReasonReact.Update state'
  };
  let resetToDefaults _event self => {
    Model.(save defaults);
    ReasonReact.Update Model.defaults
  };
  {
    ...component,
    initialState: fun () => {
      Js.log state;
      (state: componentState)
    },
    render: fun self => {
      open Model;
      let state: componentState = self.state;
      <form className="pure-form">
        <fieldset>
          <legend> (ReasonReact.stringToElement "Reset Preferences") </legend>
          <button onClick=(self.update resetToDefaults) _type="button">
            (ReasonReact.stringToElement "Reset Preferences")
          </button>
          <legend> (ReasonReact.stringToElement "Basic Preferences") </legend>
          <label htmlFor="fontFamily"> (ReasonReact.stringToElement "Font family") </label>
          <DrcOptionInput
            params=DrcOptionInput.{
                     _type: "text",
                     name: "fontFamily",
                     className: "fontFamily pure-input-1",
                     id: "fontFamily",
                     value: state.fontFamily,
                     placeholder: "Courier",
                     valueToString: fun s => s,
                     valueOfString: fun s => s,
                     updateModel: fun f m => {
                       Js.log2 "Saving font family: " f;
                       {...m, fontFamily: f}
                     }
                   }
            handleParentUpdate=(fun x y => self.update (handleUpdate x) y)
          />
          <label style=(ReactDOMRe.Style.make display::"inline" ()) htmlFor="fontSize">
            (ReasonReact.stringToElement "Font Size Adjust")
          </label>
          <span id="fontSizeDisplay">
            (ReasonReact.stringToElement " ")
            (ReasonReact.stringToElement (string_of_float (state.fontSizeAdjust *. 100.0)))
            (ReasonReact.stringToElement "0%")
          </span>
          <DrcOptionInput
            params=DrcOptionInput.{
                     _type: "range",
                     name: "fontSize",
                     className: "fontSize pure-input-1",
                     id: "fontSize",
                     value: state.fontSizeAdjust,
                     placeholder: state.fontSizeAdjust,
                     valueToString: fun f => string_of_float f ^ "0",
                     valueOfString: float_of_string,
                     updateModel: fun s m => {...m, fontSizeAdjust: s}
                   }
            min=1
            max="2.5"
            step=0.05
            handleParentUpdate=(fun x y => self.update (handleUpdate x) y)
          />
          <label htmlFor="backgroundColor">
            (ReasonReact.stringToElement "Background Color")
          </label>
          <DrcOptionInput
            params=DrcOptionInput.{
                     _type: "text",
                     name: "backgroundColor",
                     className: "backgroundColor pure-input-1",
                     id: "backgroundColor",
                     value: state.backgroundColor,
                     placeholder: Color.ofString "#fdfcfd",
                     valueToString: Color.toString,
                     valueOfString: Color.ofString,
                     updateModel: fun c m => {...m, backgroundColor: c}
                   }
            handleParentUpdate=(fun x y => self.update (handleUpdate x) y)
          />
          <label htmlFor="lineHeight"> (ReasonReact.stringToElement "Line Height") </label>
          <DrcOptionInput
            params=DrcOptionInput.{
                     _type: "text",
                     name: "lineHeight",
                     className: "lineHeight pure-input-1",
                     id: "lineHeight",
                     value: state.lineHeight,
                     placeholder: Browser_dim.(toString (Em 1.5)),
                     valueToString: fun s => s,
                     valueOfString: fun s => s,
                     updateModel: fun h m => {...m, lineHeight: h}
                   }
            handleParentUpdate=(fun x y => self.update (handleUpdate x) y)
          />
          <label htmlFor="color"> (ReasonReact.stringToElement "Text Color") </label>
          <DrcOptionInput
            params=DrcOptionInput.{
                     _type: "text",
                     name: "color",
                     className: "color pure-input-1",
                     id: "color",
                     value: state.color,
                     placeholder: Color.ofString "#000000",
                     valueToString: Color.toString,
                     valueOfString: Color.ofString,
                     updateModel: fun c m => {...m, color: c}
                   }
            handleParentUpdate=(fun x y => self.update (handleUpdate x) y)
          />
        </fieldset>
      </form>
    }
  }
};
