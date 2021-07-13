(* example *)
(* curry a function *)
(* fun curry f = fn x => fn y => f (x,y) *)
fun curry f x y = f(x,y)

(* uncurry foo so that now it expects a pair *)
fun uncurry f (x,y) = f x y

(* fun other_curry1 f = fn x => fn y => f y x *)
fun other_curry f x y = f y x
(* tupled but we wish it were curried *)
fun range (i,j) = if i > j then [] else i::range(i+1, j)
(* partial application won't work yet because it was written tupled not curried above *)
(* val countup = range 1 *)

val countup = (curry range) 1
