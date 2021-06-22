fun good_max (xs: int list) =
    if null xs
    then 0
    (* if tl xs returns null meaning xs is len 1 *)
    else if null (tl xs)
    then hd xs
    else
    (* memoization *)
        let val tl_ans = good_max(tl xs)
        in
            if hd xs > tl_ans
            then hd xs
            else tl_ans
        end
