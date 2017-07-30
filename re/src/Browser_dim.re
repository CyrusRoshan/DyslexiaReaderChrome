type t =
  | Px float
  | Em float
  | Percent float
  | In float
  | Pt float
  | None float;

let toString (t: t) =>
  switch t {
  | Px x => string_of_float x ^ "0px"
  | Em x => string_of_float x ^ "0em"
  | Percent x => string_of_float x ^ "0%"
  | In x => string_of_float x ^ "0in"
  | None x => string_of_float x
  | Pt x => string_of_float x ^ "0pt"
  };

let fromString s => {
  Js.log2 "Destringifying:" s;
  let f = ref 0.0;
  let delim = ref "";
  try (
    Scanf.sscanf
      s
      "%d.%d%s"
      (
        fun h l delim' => {
          let l' = float_of_int l;
          let l'' =
            switch (l' /. exp (log 10.0 *. ceil (log10 l'))) {
            | x when x == nan => 0.0
            | x => x
            };
          Js.log2 "l'':" l'';
          f := float_of_int h +. l'';
          delim := delim'
        }
      )
  ) {
  | _ =>
    Scanf.sscanf
      s
      "%d%s"
      (
        fun d delim' => {
          f := float_of_int d;
          delim := delim'
        }
      )
  };
  switch !delim {
  | "px" => Px !f
  | "em" => Em !f
  | "%%" => Percent !f
  | "in" => In !f
  | "pt" => Pt !f
  | "" => None !f
  | s => raise (Failure (s ^ " is not a recognized CSS dimension."))
  }
};

module Infix = {
  let (/.) t x =>
    switch t {
    | Px y => Px (y /. x)
    | Em y => Em (y /. x)
    | Percent y => Percent (y /. x)
    | In y => In (y /. x)
    | Pt y => Pt (y /. x)
    | None y => None (y /. x)
    };
  let ( *. ) t x =>
    switch t {
    | Px y => Px (y *. x)
    | Em y => Em (y *. x)
    | Percent y => Percent (y *. x)
    | In y => In (y *. x)
    | Pt y => Pt (y *. x)
    | None y => None (y *. x)
    };
};
