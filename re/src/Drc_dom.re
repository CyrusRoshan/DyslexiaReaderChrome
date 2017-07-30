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
  external cssText : style => string = "cssText" [@@bs.get];
};

module Class_list = {
  type classList;
  external add : classList => string => unit = "add" [@@bs.send];
};

external document : dom = "document" [@@bs.val];

external head : dom = "document.head" [@@bs.val];

external body : dom = "document.body" [@@bs.val];

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

external parentElement : dom => dom = "parentElement" [@@bs.get];

external replaceChild : dom => dom => dom => unit = "replaceChild" [@@bs.send];

external tagName : dom => string = "tagName" [@@bs.get];

external setInnerHTML : dom => string => unit = "innerHTML" [@@bs.set];

external setArbitraryProperty : dom => string => 'a => unit = "" [@@bs.set_index];

external getArbitraryProperty : dom => string => 'a = "" [@@bs.get_index];

external width : dom => int = "width" [@@bs.get];

external height : dom => int = "height" [@@bs.get];

external setWidth : dom => float => unit = "width" [@@bs.set];

external setHeight : dom => float => unit = "height" [@@bs.set];

external setTitle : dom => string => unit = "title" [@@bs.set];

/* Event Handlers */
external doOnLoad : dom => ('a => 'b) => unit = "onload" [@@bs.set];

let replaceInPlace target el => {
  Js.log2 "Trying to replace " target;
  Js.log2 "Child of " (parentElement target);
  Js.log2 "With " el;
  let parent = parentElement target;
  replaceChild parent el target
};

module Window = {
  type window;
  external window : window = "window" [@@bs.val];
  /* WARNING: do not use this, use the one below */
  external getComputedStyle : window => dom => 'a => Style.style = "getComputedStyle" [@@bs.send];
};

let getComputedStyle dom => Window.getComputedStyle Window.window dom Js.null;

external set_inner_text : dom => string => unit = "innerText" [@@bs.set];

module Array_buffer = {
  type arrayBuffer;
};

module UInt8_clamped_array = {
  type uInt8ClampedArray;
  external buffer : uInt8ClampedArray => Array_buffer.arrayBuffer = "buffer" [@@bs.get];
  external length : uInt8ClampedArray => int = "length" [@@bs.get];
  external get : uInt8ClampedArray => int => int = "" [@@bs.get_index];
  external from : 'a => uInt8ClampedArray = "from" [@@bs.send];
  let toBytes t => {
    let len = length t;
    let buf = Bytes.create len;
    for i in 0 to (len - 1) {
      Bytes.set buf i (Char.chr (get t i))
    };
    buf
  };
  let fromBytes s => from s;
  let equals a b => {
    let la = length a;
    let lb = length b;
    la == lb && Bytes.compare (toBytes a) (toBytes b) == 0
  };
};

module Image_data = {
  type image_data;
  /* TODO: this next line is fucking retarded and i shouldn't be using it */
  external data : image_data => UInt8_clamped_array.uInt8ClampedArray = "data" [@@bs.get];
  external get : image_data => int => int = "" [@@bs.get_index];
  external set : image_data => int => int => unit = "" [@@bs.set_index];
  external length : image_data => int = "length" [@@bs.get];
  external width : image_data => int = "width" [@@bs.get];
  external height : image_data => int = "height" [@@bs.get];
  let sum t => {
    let s = ref 0;
    for i in 0 to (length t - 1) {
      s := !s + get t i
    };
    !s
  };
};

module Canvas = {
  type canvas = dom;
  module Context = {
    type context;
    /* external drawImage : context => 'a => int => int => unit = "drawImage" [@@bs.send]; */
    external putImageData : context => Image_data.image_data => float => float => unit =
      "putImageData" [@@bs.send];
    external getImageData : context => float => float => float => float => Image_data.image_data =
      "getImageData" [@@bs.send];
    external drawImage : context => dom => float => float => float => float => unit =
      "drawImage" [@@bs.send];
    external setFillStyle : context => string => unit = "fillStyle" [@@bs.set];
    external setFont : context => string => unit = "setFont" [@@bs.set];
    external setTextBaseline : context => string => unit = "textBaseline" [@@bs.set];
    external fillRect : context => float => float => float => float => unit =
      "fillRect" [@@bs.send];
    external fillText : context => string => float => float => unit = "fillText" [@@bs.send];
  };
  external getContext : canvas => string => Context.context = "getContext" [@@bs.send];
  external width : canvas => float = "width" [@@bs.get];
  external height : canvas => float = "height" [@@bs.get];
  let grayScale: dom => canvas => unit = [%bs.raw
    {|
    function(img, canvas) {
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (avg < 220) {
          avg = 0;
        } else {
          avg = 255;
        }
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      ctx.putImageData(imageData, 0, 0);
  }
  |}
  ];
  /*let grayScale canvas => {
      let ctx = getContext canvas "2d";
      let imageData = Context.getImageData ctx 0.0 0.0 (width canvas) (height canvas);
      let data = Image_data.data imageData;
      for i in 0 to ((Image_data.length data - 1) / 4) {
        let i' = i * 4;
        let avg =
          Image_data.(get imageData i' + get imageData (i' + 1) + get imageData (i' + 1)) / 3;
        let avg = 1;
        Image_data.set data i' avg;
        Image_data.set data (i' + 1) avg;
        Image_data.set data (i' + 2) avg
      };
      Js.log2 "Image data: " imageData;
      Context.putImageData ctx imageData 0.0 0.0
    };*/
};

module Svg = {
  type svg = dom;
  module View_box = {
    type viewBox;
  };
  external viewBox : svg => View_box.viewBox = "viewBox" [@@bs.get];
};

let svg t :Svg.svg => t;

module Option = {
  type t = dom;
  external set_type : t => string => unit = "type" [@@bs.set];
  external get_type : t => unit = "type" [@@bs.get];
  external set_value : t => string => unit = "value" [@@bs.set];
  external get_value : t => unit = "value" [@@bs.get];
};
