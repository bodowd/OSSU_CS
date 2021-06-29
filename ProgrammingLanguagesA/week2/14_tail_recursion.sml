fun fact n =
    let fun aux (n, acc) =
        if n = 0
        then acc
        else aux(n-1, acc*n)
    in
        aux (n,1)
    end

val x = fact 3

(* not tail recursive version *)
fun sum1 xs =
    case xs of
        [] => 0
        | x::xs' => x + sum xs'
        (* the caller here still has work to do after the call to sum xs' finishes. It still needs to add x to that result *)

(* tail recursive *)
fun sum2 xs =
    let fun aux (xs, acc) =
        case xs of
            [] => acc
            (* new base case is the final accumulator *)
            | x::xs' => aux (xs', acc+x)
            (* no more work to do by the caller after we complete this call. It is adding as we go in the argument *)
    in
        aux(xs,0)
        (* 0 is what our base case was above in the non-tail recursive version *)
    end

(* reverse a list, non tail recursive *)
fun rev xs =
    case xs of
        [] => []
        | x::xs' => (rev xs') @ [x]
        (* can't use cons because it can't be a list in the first position and an element in the second position *)
        (* we need to make a list holding x, then append the two lists together. But this is very inefficient *)
        (* the append operator @ always copies the first list which must traverse the first list. This is O(n^2)*)

(* as efficient as a loop with tail recursion *)
fun rev2 xs =
    let fun aux (xs, acc) =
        case xs of
            [] => acc
            (* if xs is empty just return acc *)
            | x::xs' => aux(xs',x::acc)
            (* accumulator is the reversal of the list so far. We just want to put x in the front of that *)
            (* so if we reverse [1,2,3], the initial accumulator is [] (see below initial accumulator), then the next acc is 1::[], then 2::1::[], then 3::2::1::[]] *)
            (* cons is constant time, so much faster than append used in outer recursion *)
    in
        aux(xs, [])
        (* start acc with the empty list and pass in the full list xs *)
    end
