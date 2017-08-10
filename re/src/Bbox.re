module Repr = {
  type t;
  external x0 : t => float = "x0" [@@bs.get];
  external x1 : t => float = "x1" [@@bs.get];
  external y0 : t => float = "y0" [@@bs.get];
  external y1 : t => float = "y1" [@@bs.get];
};

type t = {
  x0: float,
  y0: float,
  x1: float,
  y1: float
};

let ofRepr r => {x0: Repr.x0 r, x1: Repr.x1 r, y0: Repr.y0 r, y1: Repr.y1 r};

let toString t => Printf.sprintf "x0: %.02f, y0: %.02f, x1: %.02f, y1: %.02f" t.x0 t.y0 t.x1 t.y1;

let getWidth t => abs_float (t.x1 -. t.x0);

let getHeight t => abs_float (t.y1 -. t.y0);
