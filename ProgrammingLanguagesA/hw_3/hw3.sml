(* Coursera Programming Languages, Homework 3, Provided Code *)

exception NoAnswer

datatype pattern = Wildcard
		 | Variable of string
		 | UnitP
		 | ConstP of int
		 | TupleP of pattern list
		 | ConstructorP of string * pattern

datatype valu = Const of int
	      | Unit
	      | Tuple of valu list
	      | Constructor of string * valu

fun g f1 f2 p =
    let
	val r = g f1 f2
    in
	case p of
	    Wildcard          => f1 ()
	  | Variable x        => f2 x
	  | TupleP ps         => List.foldl (fn (p,i) => (r p) + i) 0 ps
	  | ConstructorP(_,p) => r p
	  | _                 => 0
    end

(**** for the challenge problem only ****)

datatype typ = Anything
	     | UnitT
	     | IntT
	     | TupleT of typ list
	     | Datatype of string

(**** you can put all your code here ****)
val only_capitals =
    List.filter((fn x => Char.isUpper(String.sub(x, 0))))

val longest_string1 =
    List.foldl (fn (x,y) => if String.size(x) > String.size(y) then x else y) ""

val longest_string2 =
    List.foldl (fn (x,y) => if String.size(x) >= String.size(y) then x else y) ""

fun longest_string_helper f =
    List.foldl (fn (x,y) => if f(String.size(x), String.size(y)) then x else y) ""

val longest_string3 = longest_string_helper (fn (x,y) => x > y)

val longest_string4 = longest_string_helper (fn (x,y) => x >= y)

val longest_capitalized = (longest_string1 o only_capitals)

val rev_string = String.implode o List.rev o String.explode

fun first_answer f alist =
    case alist of
        [] => raise NoAnswer
        | x::xs => case f x of
                    NONE => first_answer f xs
                    | SOME v => v

fun all_answers f alist =
    case alist of
        [] => SOME []
        | x::xs => case all_answers f xs of
                    NONE => NONE
                    | SOME blist => case f x of
                                    NONE => NONE
                                    | SOME blist' => SOME (blist'@blist)

val count_wildcards = g (fn x => 1) (fn x => 0)

val count_wild_and_variable_lengths = g (fn x=> 1) String.size

fun count_some_var (s, p) = g (fn x=> 0) (fn x => if x=s then 1 else 0) p

fun check_pat (p) =
    let fun get_var_strings (pattern) =
        case pattern of
            Wildcard => []
            | Variable str => [str]
            | UnitP => []
            | ConstP i => []
            (* list of tuples ? *)
            | TupleP plist => List.foldl (fn(p,vs) => get_var_strings(p) @ vs) [] plist
            | ConstructorP (str, pat) => get_var_strings(pat)
        fun check_string_reps (strlist) =
            case strlist of
                [] => false
                | s::rest => List.exists (fn x => s=x) rest
    in
        not (check_string_reps(get_var_strings(p)))
    end

(* valu * pattern -> (stirng * valu) list option *)
fun match (valu, pattern) =
    case (valu, pattern) of
        (_, Wildcard) => SOME []
        | (_, Variable str) => SOME [(str, valu)]
        | (Unit, UnitP) => SOME []
        | (Const i, ConstP j) => if i=j then SOME [] else NONE
        | (Tuple vlist, TupleP plist) =>
            if List.length vlist = List.length plist
            then all_answers match (ListPair.zip(vlist, plist))
            else NONE
        | (Constructor(s1, v), ConstructorP(s2, p)) => if s1=s2 then match(v,p) else NONE
        | (_,_) => NONE

(* value * patterns list -> (string * valu) list option *)
fun first_match v p_list =
    SOME (first_answer (fn p => match(v, p)) p_list)
    handle NoAnswer => NONE
