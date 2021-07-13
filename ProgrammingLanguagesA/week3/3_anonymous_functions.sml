fun n_times (f,n,x) =
    if n=0
    then x
    else f (n_times(f, n-1, x))

(* fun triple x = 3*x *)

(* another way to do it *)
(* fun triple_n_times (n, x) =
    let
        fun triple x = 3*x
    in
        n_times(triple, n, x)
    end *)

(* define the function only where you need it *)
fun triple_n_times(n,x) =
    (*  change of syntax -- use fn and don't give a name, and use => instead of = -- anonymous functions *)
    n_times(fn x => 3*x, n, x)
