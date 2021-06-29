fun sum_triple1 (x,y,z)=
    x+y+z

fun full_name1 {first=x, middle=y, last=z} =
    x ^ " " ^ y ^ " " ^ z

(* doesn't use all the pieces that we're pattern-matching against  *)
(* type is int * 'a * int -> int because the type checker will find the function is more general than you expected *)
fun partial_sum (x,y,z)=
    x+z

fun partial_name {first=x, middle=y, last=z}=
    x^" " ^ z
