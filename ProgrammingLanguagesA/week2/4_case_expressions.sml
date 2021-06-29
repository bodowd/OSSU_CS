datatype mytype = TwoInts of int*int
                | Str of string
                | Pizza

 (* mytype -> int *)
fun f (x: mytype) =
    case x of
        (* if it's a Pizza evaluate to 3 *)
        Pizza => 3
        (* if it's a Str, then bind s to be in scope for this branch, but here it just evaluates to 8. We aren't using the variable s *)
        | Str s => 8
        (* if x is made from TwoInts constructor and evaluate the corresponding expression *)
        | TwoInts(i1, i2) => i1 + i2

(* f Pizza; gives 3 *)
(* f (Str "hi"); gives 8 *)
(* f "hi"; type error because "hi" is type string, not a type mytype*)
(* f (TwoInts (7,9)); gives 16*)
(* val x=Str "hi"; gives mytype, then you can call
f x; and that gives 8 because x is mytype made from Str constructor *)
