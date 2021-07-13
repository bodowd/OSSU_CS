fun sorted3 x y z = z >= y andalso y >= z

fun fold f acc xs =
    case xs of
        [] => acc
        | x::xs' => fold f (f(acc, x)) xs'

val is_nonnegative = sorted3 0 0

val sum = fold (fn (x,y) => x+y) 0

fun range i j = if i > j then [] else i::range(i+1) j

val countup = range 1
(* this is the same as the inferior way to write it: *)
(* fun countup_inferior x = range 1 x *)

fun exists predicate xs =
    case xs of
        [] => false
        (* check if the function predicate returns true, if not recursively run exists on the tail of the list *)
        | x::xs' => predicate x orelse exists predicate xs'

val no = exists (fn x => x=7) [4,11,23]

(* partial application *)
(* int list -> bool *)
val hasZero = exists (fn x => x=0)
val yes = hasZero [1,2,3,4,5,6,7,8,9,0]

(* int list -> int list *)
(* adds 1 to all the elements in the list *)
val incrementAll = List.map (fn x => x+1)

val removeZeros = List.filter (fn x => x <> 0)
