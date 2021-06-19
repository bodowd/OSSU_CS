fun silly1 (z: int) =
(* int -> int *)
    let
        val x = if z > 0 then z else 34
        val y = x + z + 9
    in
        if x > y then x*2 else y*y
    end

fun silly2() =
(* returns int -> 7 *)
    let
        val x = 1
    in
        (* creates an inner environment where x shadows the outer x. the outer x becomes irrelevant *)
        (* but in the let val y, it's a different let expression and it looks at whatever x is in the environment so x = 1 in the second one *)
        (* left let expression x will be 3 and right let expression x will refer to the outer x which is 1 so y will be 4 *)
        (let val x=2 in x+1 end) + (let val y = x+2 in y+1 end)
    end
