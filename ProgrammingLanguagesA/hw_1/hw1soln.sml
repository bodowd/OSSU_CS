fun is_older (d1: (int*int*int), d2: (int*int*int)) =
(* date is year, month, day *)
(* evaluate to true if the first argument is a date that comes before the second argument *)

(* check if year of d1 comes before d2 *)
    (#1 d1) < (#1 d2)
    (* if the above is false, checks if the years are the same AND if the month of d1 is smaller*)
        orelse ((#1 d1) = (#1 d2) andalso (#2 d1) < (#2 d2))
        (* if that is false, then checks if year is same, month is same, and if day of d1 is smaller than d2. If that is false, then it all returns false, just takes one true to return true because of orelse *)
        orelse ((#1 d1) = (#1 d2) andalso (#2 d1) = (#2 d2) andalso (#3 d1) < (#3 d2))

(*  takes a list of dates and a month (i.e., an int) and returns how many dates in the list are in the given month. *)
fun number_in_month (dates: (int * int * int) list, month: int) =
    if null dates
    then 0
    else
    let
    (* recursive call on the rest of the dates *)
        val x = number_in_month((tl dates), month)
    in
        (* check the first date of the list of dates *)
        if month = (#2 (hd dates))
        then x+1
        else x
    end

fun number_in_months (dates: (int*int*int) list, months: int list) =
    if null months orelse null dates
    then 0
    else
    (* recursive call number_in_monthS on the rest of months list and add it to the result of number_in_month (singular) operating on the first element of months (hd) *)
    number_in_months (dates, (tl months)) + number_in_month (dates, (hd months))

(*  returns a list holding the dates from the argument list of dates that are in the month. *)
fun dates_in_month (dates: (int*int*int) list, month: int) =
    if null dates
    then []
    else
    let
        val x = dates_in_month((tl dates), month)
    in
        if month = (#2 (hd dates))
        then (hd dates)::x
        else x
    end


(* returns a list holding the dates from the argument list of dates that are in any of the months in the list of months. return in same order *)
fun dates_in_months (dates: (int*int*int) list, months: int list) =
    if null dates orelse null months
    then []
    else dates_in_month(dates, hd months) @ dates_in_months(dates, tl months)
