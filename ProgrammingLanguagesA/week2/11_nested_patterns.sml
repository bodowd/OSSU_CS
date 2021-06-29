exception ListLengthMismatch

(* zip3 ([1,2,3], [4,5,6], [7,8,9]);
val it = [(1,4,7), (2,5,8), (3,6,9)] *)
fun zip3 list_triple =
    case list_triple of
        (* case where all three are empty *)
        (* the first pattern is a tuple with three list patterns inside it. Triple of three empty lists. If this pattern matches, it will return the empty list *)
        ([],[],[]) => []
        (* case where all three are non-empty *)
        (* the second pattern also matches triples. Each thing in it has to be a non-empty list by the nested pattern hdn::tln matches against non-empty lists. The empty lists will be matched by the first case, so it won't get to here *)
        (* if this pattern matches, it will then call hd1,2,3 and cons it to the recursive call of zip3 on tl1,2,3 *)
        | (hd1::tl1, hd2::tl2, hd3::tl3) => (hd1, hd2, hd3)::zip3(tl1, tl2, tl3)
        (* third case is everything else. _ matches everything and doesn't bind any variables, if first two patterns don't match, then it will check this case  *)
        | _ => raise ListLengthMismatch

(* unzip3 [(1,4,7), (2,5,8), (3,6,9)];
val it = ([1,2,3], [4,5,6], [7,8,9]) *)
(* take a list of triples back into a triple of three lists *)
fun unzip3 lst =
    case lst of
        (* pattern match the empty list *)
        [] => ([], [], [])
        (* nested pattern. pattern match the rest of the list with tl variable and match the head of the list against this each of tuple pattern *)
        (* looks to see if the hd of the list is a triple *)
        | (a,b,c)::tl => let val (l1, l2, l3) = unzip3 tl
                        in
                            (a::l1, b::l2, c::l3)
                        end
