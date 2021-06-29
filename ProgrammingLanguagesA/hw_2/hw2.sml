(* Dan Grossman, Coursera PL, HW2 Provided Code *)

(* if you use this function to compare two strings (returns true if the same
   string), then you avoid several of the functions in problem 1 having
   polymorphic types that may be confusing *)
fun same_string(s1 : string, s2 : string) =
    s1 = s2

(* put your solutions for problem 1 here *)
(* string * string list -> option *)
fun all_except_option(input, sl) =
    case sl of
        [] => NONE
        | x::xs => if same_string(input, x)
                    then SOME xs
                    (* need this case incase the string of interest comes later and not in order *)
                    else case all_except_option(input, xs) of
                        NONE => NONE
                        (* since if we get to this branch, x is not a match, we want to keep it in our result; don't want to throw it away *)
                        (* y is not a SOME on its own. So we make it a SOME. That's why we can cons x::y then make it a SOME  *)
                        | SOME y => SOME(x::y)

(* string list list, string -> string list *)
fun get_substitutions1(sll, str) =
    case sll of
        [] => []
        (* input list is a list of list of strings, so this pattern matches the non empty list which contains a list as it's first element *)
        |x::xs => case all_except_option(str, x) of
                    (* if no match, move onto the rest of the input list *)
                    NONE => get_substitutions1(xs, str)
                    (* if there is a non empty list returned from all_except_options, keep it, and then move onto the rest of the list  *)
                    |SOME y => y@get_substitutions1(xs, str)

(* string list list, string -> string list *)
fun get_substitutions2(substitutions, str) =
    (* str is still in scope for the auxillary function *)
    let fun aux (remaining, acc) =
        case remaining of
            (* new base case returns the accumulator *)
            [] => acc
            | x::xs => case all_except_option(str, x) of
                        (* if no match, just pass on the current acc, and run again on the rest of the list, xs *)
                        NONE => aux(xs, acc)
                        (* combine answers as you go along, if there is a match, add y to the accumulator, then continue with the rest of the list*)
                        | SOME y => aux(xs, acc@y)

    in
        (* old base case becomes the initial accumulator *)
        aux(substitutions, [])
    end

(* string list list, {first:string, middle: string, last: string} -> {first:string, middle: string, last: string} list*)
fun similar_names(subst, name) =
    (* name input is a record, bind f, m, and l to the corresponding values input from name *)
    let val {first=f, middle=m, last=l} = name
        (* helper function to construct names out of possible substitutions, which are a string list *)
        fun make_names xs =
            case xs of
                [] => []
                | x::xs' => {first=x, middle=m, last=l}::(make_names(xs'))
    in
        (* get substitutions of the first name, then put it in make_names to create the new record, and then cons that to the starting name *)
        name::make_names(get_substitutions2(subst, f))
    end


(* you may assume that Num is always used with values 2, 3, ..., 10
   though it will not really come up *)
datatype suit = Clubs | Diamonds | Hearts | Spades
datatype rank = Jack | Queen | King | Ace | Num of int
type card = suit * rank

datatype color = Red | Black
datatype move = Discard of card | Draw

exception IllegalMove

(* put your solutions for problem 2 here *)
(* suit * 'a -> color *)
fun card_color card =
    case card of
        (Spades, _) => Black
        | (Clubs,_) => Black
        | (Diamonds,_) => Red
        | (Hearts,_) => Red

(* suit * 'a -> int *)
fun card_value card =
    case card of
    (_,Ace) => 11
    | (_,Jack) => 10
    | (_,Queen) => 10
    | (_,King) => 10
    | (_, Num i) => i

(* card list, card, exn ->  card list *)
fun remove_card(card_list, card, e) =
    case card_list of
        [] => raise e
        | x::xs => if x = card
                    then xs
                    else x::remove_card(xs, card, e)

(* card list -> bool *)
fun all_same_color card_list =
    case card_list of
        [] => true
        (* one element list *)
        | _::[] => true
        (* 2 elements or more list -- check if head and next element of list have same color and recurse. Anywhere there is a false will be all false due to andalso *)
        | head::neck::tail => card_color head = card_color neck andalso all_same_color(neck::tail)

(* card list -> int *)
fun sum_cards card_list =
    let fun aux(remaining, acc) =
        case remaining of
            [] => acc
            | x::xs => aux(xs, card_value x + acc)
    in
        aux(card_list, 0)
    end

(* card list, int -> int *)
fun score(card_list, goal) =
    let val sum = sum_cards card_list
    in
        (if sum >= goal
        then 3*(sum-goal)
        else goal-sum)
        div
        (if all_same_color card_list then 2 else 1)

    end

(* card list, move list, int -> int  *)
fun officiate(card_list, move_list, goal) =
    let fun play(held_cards, cards_to_choose, moves_left) =
        (* first look at cases of moves left *)
        case moves_left of
        (* if no more moves left, game ends *)
            [] => score(held_cards, goal)
            (* if the move is discard, recursive call of play while removing the discarded card and removing it from the list of moves *)
            | (Discard c)::tail => play(remove_card(held_cards, c, IllegalMove), cards_to_choose, tail)
            | Draw::tail => case cards_to_choose of
                            (* if no more cards to choose from, game is over return score *)
                            [] => score(held_cards, goal)
                            (* if there are still cards left *)
                            | c::rest => if sum_cards(c::held_cards) > goal
                                         then score(c::held_cards, goal)
                                         else play(c::held_cards, rest, tail)


    in
        play([], card_list, move_list)
    end
