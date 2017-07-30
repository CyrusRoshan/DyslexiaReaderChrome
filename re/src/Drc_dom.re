type dom;

module Dom_token_list = {
  type t;
  external length : t => int = "length" [@@bs.send];
  external item : t => int => string = "item" [@@bs.send];
  external add : t => string => unit = "add" [@@bs.send];
  let toList dtl => {
    let len = length dtl;
    let rec aux acc n =>
      switch n {
      | 0 => acc
      | n =>
        let n = n - 1;
        let x = item dtl n;
        aux [x, ...acc] n
      };
    aux [] len
  };
};

module Html_collection = {
  type t;
  external length : t => int = "length" [@@bs.get];
  external item : t => int => dom = "item" [@@bs.send];
  external add : t => dom => unit = "add" [@@bs.send];
  let toList dtl => {
    let len = length dtl;
    let rec aux acc n =>
      switch n {
      | 0 => acc
      | n =>
        let n = n - 1;
        let x = item dtl n;
        aux [x, ...acc] n
      };
    aux [] len
  };
};

module Style = {
  type style;
  external get : style => string => string = "" [@@bs.get_index];
  external set : style => string => string => unit = "" [@@bs.set_index];
};

module Class_list = {
  type classList;
  external add : classList => string => unit = "add" [@@bs.send];
};

external document : dom = "document" [@@bs.val];

external getElementsByClassName : dom => string => Dom_token_list.t =
  "getElementsByClassName" [@@bs.send];

external getElementsByTagName : dom => string => Dom_token_list.t =
  "getElementsByTagName" [@@bs.send];

external getElementById : dom => string => dom = "getElementById" [@@bs.send];

external createElement : dom => string => dom = "createElement" [@@bs.send];

external appendChild : dom => dom => dom = "appendChild" [@@bs.send];

external getStyle : dom => Style.style = "style" [@@bs.get];

external classList : dom => Class_list.classList = "classList" [@@bs.get];

external children : dom => Html_collection.t = "children" [@@bs.get];

module Window = {
  type window;
  external window : window = "window" [@@bs.val];
  /* WARNING: do not use this, use the one below */
  external getComputedStyle : window => dom => 'a => Style.style = "getComputedStyle" [@@bs.send];
};

let getComputedStyle dom => Window.getComputedStyle Window.window dom Js.null;

external set_inner_text : dom => string => unit = "innerText" [@@bs.set];

module Option = {
  type t = dom;
  external set_type : t => string => unit = "type" [@@bs.set];
  external get_type : t => unit = "type" [@@bs.get];
  external set_value : t => string => unit = "value" [@@bs.set];
  external get_value : t => unit = "value" [@@bs.get];
};
