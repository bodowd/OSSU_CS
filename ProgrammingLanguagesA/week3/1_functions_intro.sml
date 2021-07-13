(* int -> int *)
fun double x = 2*x
(* int -> int *)
fun incr x = x+1
(* the first and second positions just looks up the function but doesn't call it *)
(* the last position does call the function and will return 16 *)
(* (fn, fn, 16): (int -> int) * (int -> int) * int *)
val a_tuple = (double, incr, double(incr 7))

(* call double by pulling it out of the tuple and then pass 9 to it *)
val eighteen = (#1 a_tuple) 9
