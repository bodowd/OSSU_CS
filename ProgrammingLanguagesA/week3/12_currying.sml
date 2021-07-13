(* old way to get the effect of multiple arguments *)
fun sorted3_tupled (x,y,z) = z >= y andalso y>= x
val t1 = sorted3_tupled (7,9,11)

(* new way: currying *)
val sorted3 = fn x => fn y => fn z => z >= y andalso y>=x

(* the same thing in a different way could be : *)
(* fun sorted3 x = fn y=> fn z => ... *)

(* because sorted3 returns function, we can call the returned function with new arguments *)
val t2 = ((sorted3 7) 9) 11

(* syntatic sugar *)
val t3 = sorted3 7 9 11

(* syntatic sugar for writing currying function *)
fun sorted3_nicer x y z = z >= y andalso y >= x

(* curried way to write fold *)
fun fold f acc xs =
    case xs of
        [] => acc
        | x::xs' => fold f (f(acc, x)) xs'

(* a call to curried fold  *)
fun sum xs = fold (fn(x,y)=>x+y) 0 xs
