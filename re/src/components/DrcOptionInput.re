type componentParams 'a = {
  _type: string,
  name: string,
  className: string,
  id: string,
  value: 'a,
  placeholder: 'a,
  valueToString: 'a => string,
  valueOfString: string => 'a,
  updateModel: 'a => Model.t => Model.t
};

/*type componentState 'a = 'a;*/
let component = ReasonReact.statelessComponent "DrcOptionInput";

let make
    params::(params: componentParams 'a)
    ::min=?
    ::max=?
    ::step=?
    ::handleParentUpdate
    _children => {
  /*let handleUpdate = fun el _event state _self => {
      handleParentUpdate el _event state _self;
      ReasonReact.Update state'
    };*/
  ...component,
  /*initialState: fun () => params.value,*/
  render: fun self => {
    Js.log2 "Self: " self;
    Js.log2 "el: " Drc_dom.(getElementById document params.id);
    let handler = handleParentUpdate (params.updateModel, params.id, params.valueOfString);
    <input
      _type=params._type
      name=params.name
      className=params.className
      id=params.id
      defaultValue=(params.valueToString params.value)
      placeholder=(params.valueToString params.placeholder)
      onChange=handler
      min=?min
      max=?max
      step=?step
    />
  }
};
