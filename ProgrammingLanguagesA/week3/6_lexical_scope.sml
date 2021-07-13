(* 1 *)
val x=1
(* x maps to 1 *)
(* 2 *)
fun f y = x + y
(* f maps to a function that adds 1 to its argument *)
(* when this function is called, the environment at the time the function was defined has x mapping to 1 *)
(* 3 *)
val x = 2
(* shadow x. now x maps to 2 *)
(* 4 *)
val y = 3
val z = f (x + y)
(* calls the function defined by line 2 with 5 because the current environment has x map to 2 and y map to 3 which equals to 5  *)
(* in the end z maps to 6 *)
