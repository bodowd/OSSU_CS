fun sum_list (xs: int list) =
    if null xs
    then 0
    (* hd takes the first element of the list and tl takes the rest of the list excluding the first element *)
    else hd xs + sum_list(tl xs)

fun product_list (xs: int list) =
    if null xs
    then 1
    else hd xs * product_list(tl xs)

fun countdown (x: int) =
    (* x=7 -> [7, 6, 5, 4, 3, 2,1] *)
    if x=0
    then []
    (* concatenate x to a list which comes from base case? *)
    else x :: countdown(x-1)

fun append (xs: int list, ys: int list) =
(* append ([1,2], [3,4]) *)
    if null xs
    then ys
    else (hd xs) :: append((tl xs), ys)

(* functions over pairs of lists *)
fun sum_pair_list (xs: (int * int) list) =
(* sum_pair_list [(3,4), (5,6)] -> 18 *)
    if null xs
    then 0
    (* hd xs gets the first pair, then #1 gets the first element of the first pair *)
    else #1 (hd xs) + #2 (hd xs) + sum_pair_list(tl xs)

fun firsts (xs: (int * int) list) =
(* firsts  [(3,4), (5,6)] -> [3,5] *)
    if null xs
    then []
    else (#1 (hd xs)) :: firsts(tl xs)

fun seconds (xs: (int * int) list) =
    if null xs
    then []
    else (#2 (hd xs)) :: seconds(tl xs)

fun sum_pair_list2 (xs: (int * int) list) =
    (sum_list (firsts xs)) + (sum_list (seconds xs))

fun factorial (n: int) =
    if n = 1
    then 1
    else n * factorial(n-1)

fun factorial2 (n: int) =
    product_list(countdown n)
