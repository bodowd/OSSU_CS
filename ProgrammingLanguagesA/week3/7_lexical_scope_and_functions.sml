val x = 1

(* this returns a function. The anonymous function that takes z *)
fun f y =
    let
        (* local variable x that shadows the outer environment x *)
        val x = y+1
    in
        (* returns 2y + 1 + z *)
        fn z => x+y+z
    end

(* this x binding will be irrelevant *)
val x = 3

(* returns a function that adds 9 to its argument *)
val g = f 4

(* irrelevant *)
val y = 5

(* will return 15 from 9+6. 6 is the argument z in the anonymous function in the let expresssion in f *)
val z = g 6


(* second example *)
fun f g =
    (* binding x here is irrelevant -- never uses this local variable *)
    let val x = 3
    (* this function just takes a function g and calls it with 2 *)
    in g 2
    end

val x = 4
(* add 4 to its argument. Creates a closure that has the current env where the func was defined. In current env, x = 4 *)
fun h y = x+y
(* looks up f, which always calls its argument with 2, then pass in h which always adds 4 to its argument *)

val z = f h
