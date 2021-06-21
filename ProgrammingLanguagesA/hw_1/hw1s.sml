(* (int*int*int), (int*int*int) -> bool *)
(* returns true if the first argument is a date that comes before the second argument *)
fun is_older (d1: (int*int*int), d2: (int*int*int)) =
    (* check years *)
    (#1 d1 < #1 d2)
    (* check months *)
    orelse (#1 d1 = #1 d2 andalso #2 d1 < #2 d2)
    (* check days *)
    orelse (#1 d1 = #1 d2 andalso #2 d1 = #2 d2 andalso #3 d1 < #3 d2)

(* (int*int*int) list, int -> int *)
fun number_in_month (dateList: (int*int*int) list, month: int) =
    if null dateList
    then 0
    else
        let val x = number_in_month(tl dateList, month)
        in
            if #2 (hd dateList) = month
            then x+1
            else x
        end

(* (int*int*int) list, int list -> int *)
(* return number of dates in the list of dates that are in any of the months in list of months *)
fun number_in_months (dateList: (int*int*int) list, monthList: int list)=
    if null monthList
    then 0
    else
        number_in_month(dateList, hd monthList) + number_in_months(dateList, tl monthList)


(* (int*int*int) list, int -> (int*int*int) list *)
(* returns list holding dates that are in the month in order it was given *)
fun dates_in_month(dateList: (int*int*int) list, month: int) =
    if null dateList
    then []
    else
        let val d = dates_in_month(tl dateList, month)
        in
            if #2 (hd dateList) = month
            then (hd dateList)::d
            else d
        end

(* (int*int*int) list, int list *)
(* return a list holding dates that are in any of the months *)
fun dates_in_months (dateList: (int*int*int) list, monthList: int list) =
    if null monthList
    then []
    else
        dates_in_month(dateList, hd monthList)@dates_in_months(dateList, tl monthList)

(* string list, int -> string *)
(* return the nth element of the string list *)
fun get_nth (sList: string list, n: int) =
    if n=1
    then hd sList
    (* recursively chop the list down *)
    else get_nth(tl sList, n-1)

(* (int*int*int)-> string *)
fun date_to_string(date: (int*int*int)) =
    let
        val sDates = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        val year = #1 date
        val month = get_nth(sDates, #2 date)
        val day = #3 date
    in
        month^" "^Int.toString(day)^", "^Int.toString(year)
    end

(* int, int list -> int *)
fun number_before_reaching_sum(sum: int, nList: int list)=
    if sum <= hd nList
    then 0
    (* cut the sum down by the current hd list and keep going until the _remaining_ sum is less than the hd list *)
    else 1+number_before_reaching_sum(sum - hd nList, tl nList)

(* int -> int *)
fun what_month(day: int) =
    let
        val days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    in
        (* starts counting at 0 because if you put a number less than 31, it will return 0 *)
        1+number_before_reaching_sum(day, days_in_month)
    end

(* int, int -> int list *)
fun month_range(day1: int, day2: int) =
    if day1>day2
    then []
    else
        let val x = what_month(day1)
        in
            x::month_range(day1+1, day2)
        end

(* (int*int*int) list -> (int*int*int) option *)
fun oldest(dateList: (int*int*int) list) =
    if null dateList
    then NONE
    else
        let val o_ans = oldest(tl dateList)
        in
            (* if is_older returns true, then the hd dateList becomes the current val o otherwise keep val o *)
            if not(isSome(o_ans)) orelse is_older(hd dateList, valOf(o_ans))
            then SOME (hd dateList)
            else o_ans
        end
