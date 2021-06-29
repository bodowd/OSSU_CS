(* more clumsy way *)
fun nondecreasing1 xs = (* int list -> bool *)
    case xs of
        [] => true
        | x::xs' => case xs' of
                    [] => true
                    | y::ys' => x <= y andalso nondecreasing1 xs'


fun nondecreasing xs =
    case xs of
        [] => true
        (* one element case. hd of the list matches x and the rest of the list matches the empty list *)
        | _::[] => true
        (* matches all lists with 2 or more elements *)
        (* nondecreasing (neck::rest) moves one element down *)
        | head::(neck::rest) => head <= neck andalso nondecreasing (neck::rest)

datatype sgn = P | N | Z

fun multsgn (x1, x2) = (* int * int -> sgn *)
    let fun sign x =
        if x=0
        then Z
        else
            if x>0
            then P
            else N
    in
        case (sign x1, sign x2) of
            (* if anything is Z (zero) then you get the sgn Zero because anything times 0 is 0 *)
            (Z,_) => Z
            | (_,Z) => Z
            | (P,P) => P
            | (N,N) => P
            | (N,P) => N
            | (P,N) => N
    end

fun len xs =
    case xs of
        [] => 0
        | _::xs => 1 + len xs
