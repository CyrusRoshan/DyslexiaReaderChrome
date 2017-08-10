type t = {
  r: float,
  g: float,
  b: float,
  a: float
};

let from_ints r g b a => {
  r: float_of_int r /. 255.0,
  g: float_of_int g /. 255.0,
  b: float_of_int b /. 255.0,
  a: float_of_int a /. 255.0
};

let toString t => {
  let r = Printf.sprintf "%03d" (int_of_float (t.r *. 255.0));
  let g = Printf.sprintf "%03d" (int_of_float (t.g *. 255.0));
  let b = Printf.sprintf "%03d" (int_of_float (t.b *. 255.0));
  let a = Printf.sprintf "%03d" (int_of_float (t.a *. 255.0));
  "rgba(" ^ r ^ "," ^ g ^ "," ^ b ^ "," ^ a ^ ")"
};

let ofString s => {
  let (r, g, b) = (ref 0, ref 0, ref 0);
  let _ =
    Scanf.sscanf
      s
      "#%02x%02x%02x"
      (
        fun r' g' b' => {
          r := r';
          g := g';
          b := b'
        }
      );
  from_ints !r !g !b 255
};
