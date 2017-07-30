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
