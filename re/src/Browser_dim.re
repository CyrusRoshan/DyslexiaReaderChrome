type t =
  | Px float
  | Em float
  | Percent float
  | In float
  | Pt float
  | None float;

let toString t =>
  switch t {
  | Px x => string_of_float x ^ "0px"
  | Em x => string_of_float x ^ "0em"
  | Percent x => string_of_float x ^ "0%"
  | In x => string_of_float x ^ "0in"
  | Pt x => string_of_float x ^ "0pt"
  | None x => string_of_float x
  };

let fromString s => {
  let f = ref 0.0;
  let delim = ref "";
  Scanf.sscanf
    s
    "%f%s"
    (
      fun f' delim' => {
        f := f';
        delim := delim'
      }
    );
  switch !delim {
  | "px" => Px !f
  | "em" => Em !f
  | "%%" => Percent !f
  | "in" => In !f
  | "pt" => Pt !f
  | "" => None !f
  }
};
