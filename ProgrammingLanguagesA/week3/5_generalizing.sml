(* Returning a function *)
(* (int -> bool) -> (int -> int) *)
fun double_or_triple f =
    (* checks if the function passed in evaluates to 7 *)
    if f 7
    (* return a function which will take x as argument *)
    then fn x => 2*x
    else fn x => 3*x

(* input anonymous function will evaluate to 7 *)
(* returns a function called double *)
val double = double_or_triple (fn x => x-3 = 4)

(* returns a function which will triple and then we pass 3 to that function *)
val nine = (double_or_triple (fn x => x= 42)) 3

datatype exp = Constant of int
            | Negate of exp
            | Add of exp * exp
            | Multiply of exp * exp

fun true_of_all_constants(f,e) =
    case e of
        Constant i => f i
        | Negate e1 => true_of_all_constants(f, e1)
        | Add(e1,e2) => true_of_all_constants(f, e1) andalso true_of_all_constants(f, e2)
        | Multiply(e1,e2) => true_of_all_constants(f, e1) andalso true_of_all_constants(f, e2)

(* create a function that checks if everything is even *)
(* the anonymous function checks if something is even *)
fun all_even e = true_of_all_constants((fn x => x mod 2 = 0), e)
fun all_odd e = true_of_all_constants((fn x => x mod 2 <> 0), e)

val example_exp = Constant 3
val example_exp2 = Add(Constant 6, Constant 4)
val test_0 = all_even(Constant 4)
val test_1 = all_even example_exp = false
val test_2 = all_odd example_exp = true
val test_3 = all_even example_exp2 = true
