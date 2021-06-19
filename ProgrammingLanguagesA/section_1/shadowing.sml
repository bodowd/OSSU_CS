val a = 10

val b = a*2
(* the env is extended to
a -> 10 and
b is bound to 20  *)

val a = 5
(* this is not an assignment statement *)
(* in the subsequent env a now maps to 5, but b is still bound to 20 *)

val c = b

val d = a
(* ..., d -> 5 *)

val a = a + 1
(* in the current dynamic env a -> 5 and now a -> 6 in the current environment *)

(* val g = f - 3 will not type check because f is not yet in the static environment *)
val f = a * 2
(* f-> 12 *)
