(* a set of ints with three operations
interface is immutable -- insert returns a new set
a 1-constructor datatype (the s below) is an SML trick for recursive types *)


datatype set = s of {insert: int -> set,
            member: int -> bool,
            size: unit -> int}

(* datatype set = s of {insert: int -> set,
            member: int -> bool,
            size: unit -> int} *)

val empty_set =
    let
      fun make_set xs =
        let
          fun contains i = List.exists (fn j => i=j) xs
        in
            (* don't want duplicates in the set. so if it contains i in already, just recursive call make_set on the tail of the list, if the element not in the set yet, then cons it onto the list and make a new set out of that *)
          s {insert = fn i => if contains i
                                then make_set xs
                                else make_set (i::xs),
            member = contains,
            size = fn() => length xs}
        end
    in
        make_set []
    end

(* example client *)
fun use_sets () = (* unit -> int *)
    let val s s1 = empty_set
        (* s1.insert(34) in other languages *)
        val s s2 = (#insert s1) 34
        val s s3 = (#insert s2) 34
        val s s4 = #insert s3 19 (* set contains 19, 34 *)
    in
        if (#member s4) 42
        then 99
        else if (#member s4) 19
        then 17 + (#size s3) ()
        else 0
    end
