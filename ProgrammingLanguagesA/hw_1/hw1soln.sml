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


(* string list, int -> string *)
fun get_nth (s: string list, n: int) =
    if n=1
    then hd s
    (* recursively chop the list down by chopping n down. Each time checks if n=1 and returns the hd of the current list which each time the previous head is removed *)
    else get_nth((tl s), n-1)

(* (int*int*int) -> string *)
fun date_to_string (date: (int*int*int)) =
    let
        val months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"]
        val year = Int.toString(#1 date)
        val day = Int.toString(#3 date)
        val month = #2 date
    in
        get_nth(months, month)^" "^day^","^" "^year
    end

(* int, int list -> int *)
fun number_before_reaching_sum (sum: int, l: int list) =
    (* sum is the target, so if it is larger than the current first element of the list, then we don't count it by returning 0 *)
    if sum <= hd l
    then 0
    (* sum - hd l because we want to see how much we still need to make the whole sum *)
    else 1 + number_before_reaching_sum(sum - hd l, tl l)


(* int -> int *)
(* return what month that day (1 to 365) is in *)
fun what_month (day: int) =
    let
        val days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    in
        (* add 1 because it starts counting at 0  *)
        1+number_before_reaching_sum (day, days_in_month)
    end

(* int, int -> int list *)
(* return int list [m1,m2,...,mn] where m1 is month of day1, m2 is month of day1+1,...and mn is month of day2  *)
fun month_range(day1: int, day2: int) =
    (* we will keep adding to day1 in the recursive call. When day1 becomes larger than day2 we finish by returning empty list *)
    if day1 > day2
    then []
    else
        (* get the month for day one and add to the list which is returned by recursively calling month_range and adding to day 1 *)
        what_month(day1)::month_range(day1 + 1, day2)

(* (int*int*int) -> (int*int*int) option *)
(* return the oldest date in the list *)
fun oldest(dates: (int*int*int) list)=
    if null dates
    then NONE
    else
        let
            val tl_ans = oldest(tl dates)
        in
            if not(isSome(tl_ans)) orelse is_older(hd dates, valOf(tl_ans))
            then SOME (hd dates)
            else tl_ans
        end
