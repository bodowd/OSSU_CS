fun fold (f, acc, xs) =
    case xs of
        [] => acc
        | x::xs' => fold(f,f(acc,x), xs')


(* sum the list *)
(* initial acc is 0 *)
(* first argument x of anonymous func is the current acc *)
(* second argument is the next element of the list. Seen in f(acc,x) in the recursive call *)
fun f1 xs = fold((fn (x,y) => x+y), 0, xs)

(* checks if all list elements are non-negative *)
fun f2 xs = fold((fn (x,y) => x andalso y >= 0), true, xs)


(* examples using private data *)

(* count number of elements between lo and hi inclusive *)
fun f3 (xs, lo, hi) =
    (* lo and hi are only in scope to here where the function is defined --> private data *)
    (* x is current acc and y is the next element of the list *)
    fold ((fn (x,y) => x + (if y >= lo andalso y <= hi then 1 else 0)), 0, xs)

(* are all elements of the list < size i *)
fun f4 (xs, s) =
    let
      (* bind size of string *)
      val i = String.size s
    in
      fold((fn (x,y) => x andalso String.size y<i), true, xs)
    end

(* pass in a function g to decide if a certain element of the list passes the test and then f4 checks if all elements pass the test *)
fun f5 (g,xs) = fold((fn (x,y) => x andalso g y), true, xs)

fun f4again(xs, s) =
    let
      val i = String.size s
    in
      f5(fn y=>String.size y <i, xs)
    end
