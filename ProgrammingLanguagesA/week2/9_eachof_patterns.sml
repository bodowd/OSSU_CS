(* bad style because of one-armed branches *)
fun sum_triple1 (triple: int * int * int)=
    case triple of
        (x,y,z) => z+y+x

(* okay style because it uses a val binding *)
fun sum_triple2 triple =
    let val (x,y,z) = triple
    in x+y+z
    end

(* best style, uses pattern matching in the function argument *)
fun sum_triple3 (x,y,z)=
    x+y+z

fun print_record {foo=x} =
    x
