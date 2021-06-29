val a_pair = (3+1, 4+2);

val a_record = {second=4+2, first=3+1}

val another_pair = {2=5, 1=6};
(* REPL will print (6,5): int*int. It will print out a pair *)

val x={3="hi", 1=true}
(* prints {1=true, 3="hi"}: {1: bool, 3:string} *)

val y = {3="hi", 1=true, 2=3+2}
(* prints (true, 5, "hi"): bool * int * string *)

(* no tuples really in ML, they are just syntatic sugar for records *)
(* special syntax for writing certain records (tuples) *)
