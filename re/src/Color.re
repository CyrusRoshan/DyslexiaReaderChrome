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
  let r = string_of_float t.r;
  let g = string_of_float t.g;
  let b = string_of_float t.b;
  let a = string_of_float t.a;
  "rgba(" ^ r ^ "," ^ g ^ "," ^ b ^ "," ^ a ^ ")"
};
