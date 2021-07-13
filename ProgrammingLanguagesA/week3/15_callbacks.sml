(* val onKeyEvent : (int -> unit) -> unit *)

val cbs : (int -> unit) list ref = ref []

(* update cbs to refer to a list with one more element than it used to have *)
fun onKeyEvent f = cbs := f::(!cbs)

fun onEvent i =
    let fun loop fs =
        case fs of
            (* do nothing if empty list *)
            [] => ()
            (* call the function with argument i and recursively call again loop on the rest of the list *)
            | f::fs' => (f i; loop fs')
    in loop(!cbs) end

val timesPressed = ref 0
val _ = onKeyEvent (fn _ => timesPressed := (!timesPressed) + 1)

fun printIfPressed i =
    onKeyEvent (fn j => if i=j
                        then print ("you pressed " ^ Int.toString i ^ "\n")
                        else ())

val _ = printIfPressed 4
val _ = printIfPressed 11
val _ = printIfPressed 23
val _ = printIfPressed 4
