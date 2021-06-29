fun hd xs =
    case xs of
        [] => raise List.Empty
        | x::xs => x

exception MyUndesirableCondition

(* exceptions are like constructors *)
exception MyOtherException of int * int
(* raise MyOtherException(3,4) -- can pass data out *)

fun mydiv (x,y) =
    if y=0
    then raise MyUndesirableCondition
    else x div y

(* exception type is 'exn' in ML *)
(* int list * exn -> int *)
fun maxlist (xs, ex) =
    case xs of
    [] => raise ex
    | x::[] => x
    | x::xs' => Int.max(x, maxlist (xs', ex))

val w = maxlist ([3,4,5], MyUndesirableCondition)

(* e1 handle ex => e2 *)
(* if e1 evaluates normally the rest is irrelevant, otherwise if e1 raises the exception listed as ex, then we will catch that exception and we will evaluate e2. If it's a different exceptoin, we won't handle it and will just catch it *)

(* returns 5 *)
val x = maxlist ([3,4,5], MyUndesirableCondition)
        handle MyUndesirableCondition => 42

(* exception will be caught and it matches what we are handling, so binds z to 42 *)
val z = maxlist ([], MyUndesirableCondition)
        handle MyUndesirableCondition => 42
