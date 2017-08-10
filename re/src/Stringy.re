exception Found_alpha;

let containsAlpha = {
  let code_a = Char.code 'a';
  let code_z = Char.code 'z';
  let code_A = Char.code 'A';
  let code_Z = Char.code 'Z';
  fun s =>
    try {
      for i in 0 to (String.length s - 1) {
        let c = s.[i];
        let c' = Char.code c;
        if (c' >= code_a && c' <= code_z || c' >= code_A && c' <= code_Z) {
          raise Found_alpha
        }
      };
      false
    } {
    | Found_alpha => true
    | exn =>
      Printf.printf "Error: String.containsAlpha hit what should be an impossible exceptional case.";
      raise exn
    }
};
