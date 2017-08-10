type ocrResponse 'a = 'a;

module Word = {
  module Repr = {
    type t;
    external text : t => string = "text" [@@bs.get];
    external confidence : t => float = "confidence" [@@bs.get];
    external bBox : t => 'a = "bbox" [@@bs.get];
    external fontSize : t => float = "font_size" [@@bs.get];
  };
  type t = {
    text: string,
    confidence: float,
    bBox: Bbox.t,
    fontSize: string
  };
  let ofRepr repr => {
    text: Repr.text repr,
    confidence: Repr.confidence repr,
    bBox: Bbox.ofRepr (Repr.bBox repr),
    fontSize: Browser_dim.(toString (Px (Repr.fontSize repr)))
  };
  let insertInto t container => {
    let box = t.bBox;
    let w = Bbox.getWidth box;
    let fontSize = Browser_dim.(Infix.( *. ) (fromString t.fontSize) 3.0);
    Js.log2 "Font size: " fontSize;
    let el = Drc_dom.(createElement document "div");
    Drc_dom.(setInnerHTML el t.text);
    Js.log2 "Inserting: " el;
    ignore (Drc_dom.appendChild container el);
    Js.log2 "Inserting a word: " t;
    Js.log2 "Word's bounding box is: " (Bbox.toString t.bBox);
    Drc_dom.(Style.set (getStyle el)) "position" "absolute";
    Drc_dom.(Style.set (getStyle el)) "text-align" "center";
    Drc_dom.(Style.set (getStyle el)) "display" "inline";
    Drc_dom.(Style.set (getStyle el)) "font-size" (Browser_dim.toString fontSize);
    Js.log2 "Setting font size:" (Browser_dim.toString fontSize);
    let title = Printf.sprintf "\"%s\": %f%% confidence" t.text t.confidence;
    Drc_dom.setTitle el title;
    let containerStyle = Drc_dom.getComputedStyle container;
    let cW =
      switch (Browser_dim.fromString (Drc_dom.Style.get containerStyle "width")) {
      | Px x => x
      | _ => raise (Failure "Width should be in px")
      };
    let elStyle = Drc_dom.getComputedStyle el;
    let w' =
      switch (Browser_dim.fromString (Drc_dom.Style.get elStyle "width")) {
      | Px x => x
      | _ => raise (Failure "Width should be in px")
      };
    Js.log2 "w': " w';
    let (top, left) = {
      let t = box.y0;
      let l = box.x0;
      (t, l)
    };
    let (left, w'') =
      if (w' > cW) {
        let factor = cW /. w';
        Drc_dom.Style.set
          (Drc_dom.getStyle el) "font-size" Browser_dim.(toString (Infix.( *. ) fontSize factor));
        (0.0, w' *. factor)
      } else if (
        w' +. left > cW
      ) {
        let factor = cW /. (w' +. left);
        Drc_dom.Style.set
          (Drc_dom.getStyle el) "font-size" Browser_dim.(toString (Infix.( *. ) fontSize factor));
        let w'' = w' *. factor;
        Js.log2 "w'': " w'';
        (left -. (w'' +. left -. cW), w'')
      } else {
        (left, w)
      };
    Drc_dom.(Style.set (getStyle el)) "top" Browser_dim.(toString (Px top));
    Drc_dom.(Style.set (getStyle el)) "left" Browser_dim.(toString (Px left));
    Drc_dom.(Style.set (getStyle el)) "width" (string_of_float w'' ^ "0px");
    /* interactivity */
    Drc_dom.(Class_list.(add (classList el) "drcOcrExtractedTextOverlay"));
    Drc_dom.(Class_list.(add (classList el) "drcExempt"))
  };
};

type detection = {
  text: string,
  confidence: float,
  words: array Word.t
};

external confidence : ocrResponse 'a => float = "confidence" [@@bs.get];

external text : ocrResponse 'a => string = "text" [@@bs.get];

external words : ocrResponse 'a => array Word.Repr.t = "words" [@@bs.get];

[%%bs.raw
  {|
  var Tesseract = require('tesseract.js').create({
    workerPath: chrome.extension.getURL("tesseract/worker.js"),
    corePath: chrome.extension.getURL("tesseract/index.js"),
    langPath: chrome.extension.getURL("tesseract/")
  });
|}
];

let ocr
    (imageData: Drc_dom.Image_data.image_data)
    (imageName: string)
    (callback: ocrResponse 'a => unit)
    :bool => {
  ignore imageName;
  let getOverallAvg: Drc_dom.Image_data.image_data => float = [%bs.raw
    {|
    function(data) {
      var data = data.data;
      var avg = null;
      var cnt = 0;
      for (var i = 0; i < data.length; i += 4) {
        avg = avg + ((data[i] + data[i + 1] + data[i + 2]) / 3) / (data.length / 4);
      };
      console.log("Got overall average: ", avg);
      return avg;
    }
  |}
  ];
  let grayScale: float => Drc_dom.Image_data.image_data => unit = [%bs.raw
    {|
    function(overallAvg, data) {
      var data = data.data;
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (overallAvg < 127.5) {
          avg = 255 * Math.sqrt(avg / 255);
        } else {
          avg = ((255*Math.exp((avg-128)/2))/(Math.exp((avg-128)/2)+1)+avg)/2;
        }
        /* if (avg < 128) {
          avg = 0;
        } else {
          avg = 255;
        } */
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
  }
  |}
  ];
  Js.log2 "(overallAvg): " (getOverallAvg imageData);
  grayScale (getOverallAvg imageData) imageData;
  let w = Drc_dom.Image_data.width imageData;
  let h = Drc_dom.Image_data.height imageData;
  let canvas = Drc_dom.(createElement document "canvas");
  Drc_dom.(setArbitraryProperty canvas "width" w);
  Drc_dom.(setArbitraryProperty canvas "height" h);
  let context = Drc_dom.Canvas.(getContext canvas "2d");
  Js.log2 "Putting image data: " imageData;
  Drc_dom.Canvas.Context.putImageData context imageData 0.0 0.0;
  let analyze: Drc_dom.Image_data.image_data => (ocrResponse 'a => 'b) => unit = [%bs.raw
    {|
    function(img, callback) {
      console.log("Running OCR an image: ");
      try {
        Tesseract.recognize(img)
          .progress(message => console.log("Tesseract progress: ", message))
          .then(callback)
          .catch((exn) => console.log("OCR fuckup: ", exn));
      } catch (e) {
        console.log('something fucky happened in Ocr.ocr.analyze.');
      }
      return true;
    }
    |}
  ];
  let callback' resp => {
    Js.log2 "Resp: " resp;
    let resp' = {
      text: String.trim (text resp),
      confidence: confidence resp,
      words: Array.map Word.ofRepr (words resp)
    };
    Js.log2 "Rval:" resp';
    callback resp'
  };
  analyze imageData callback';
  true
};
