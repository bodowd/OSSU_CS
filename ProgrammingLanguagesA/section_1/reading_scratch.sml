(* type check expression and extend static environment
evaluate expression and extend dynamic environment *)

val x = 34;
(* static environment: x: int because 34 is an int *)
(* dynamic environment: x holds 34 *)
val y = 17;
(* static environment: x: int and y: int *)
(* dynamic environment: x holds 34 and y holds 17 *)

val z = (x+y) + (y+2);
(* static environment: x: int, y: int, z: int. Static environment will look it up *)
(* dynamic environment: x holds 34 and y holds 17, and we evaluate this expression
in the current dynamic environment. It will look up what x and y is, and z will hold 70 in this environment *)

val q = z+1;
(* dynamic environment will hold 71 now *)

val abs_of_z = if z < 0 then 0 - z else z;
(* static environment: abs_of_z: int *)
(* dynamic environment: everything we had before and now abs_of_z --> 70 *)


(* static environment just checks what types everything is but doesn't run the program
dynamic environment will run it *)


(* we have seen different expressions so far: 34, true, false, 17, etc. *)

fun pow (x:int, y:int) =
    (* Compute x^y
    Correct only for y>=0 *)
    if y=0
    then 1
    else x * pow(x,y-1)
