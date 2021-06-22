(* options are a lot like lists but instead of having any number of elements, they have one element or no elements *)
(* fn: int list -> int option *)
fun max1 (xs: int list) =
    if null xs
    (* always returning an option *)
    then NONE
    else
        let val tl_ans = max1(tl xs)
        (* need isSome and valOf to access the option *)
        in if isSome tl_ans andalso valOf tl_ans > hd xs
            then tl_ans
            else SOME (hd xs)
        end

fun max2 (xs: int list) =
    if null xs
    then NONE
    (* Now we can assume argument is not empty *)
    else let
            (* this function has int list -> int *)
            fun max_nonempty (xs: int list) =
                if null (tl xs) (* check if this is one element list, then return the one element*)
                then hd xs
                else let val tl_ans = max_nonempty(tl xs)
                    in
                        if hd xs > tl_ans
                        then hd xs
                        else tl_ans
                    end
        in
        (* convert it into an option *)
            SOME (max_nonempty xs)
        end
