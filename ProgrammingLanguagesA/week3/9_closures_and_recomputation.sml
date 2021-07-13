fun filter (f, xs) =
    case xs of
        [] => []
        | x::xs => if f x
                    then x::filter(f, xs)
                    else filter(f, xs)

(* string list * string -> string list *)
fun allShorterThan1 (xs, s) =
    (* recomputes String.size s every time for every element in list xs  *)
    filter (fn x=> String.size x < String.size s, xs)

fun allShorterThan2 (xs, s) =
    (* create local variable that holds the size of s *)
    let
        val i = String.size s
    (* stores with this closure the environment where the function was defined, so that we can use this variable i *)
    in
        filter(fn x => String.size x < i, xs)
    end
