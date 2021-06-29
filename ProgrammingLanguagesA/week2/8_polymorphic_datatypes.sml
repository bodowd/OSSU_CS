datatype ('a, 'b) tree = Node of 'a * ('a, 'b) tree * ('a, 'b) tree
                        | Leaf of 'b

(* tree must have int in both 'a and 'b field: type is (int, int) tree -> int *)
fun sum_tree tr =
    case tr of
        Leaf i => i
        | Node (i, lft, rgt) => i + sum_tree lft + sum_tree rgt

(* tree must have int in its 'b field, but doesn't matter what data is in 'a. Doesn't actually use the data at that node: type is ('a, int) tree -> int *)
fun sum_leaves tr =
    case tr of
        Leaf i => i
        (* below, doesn't actually use the data i at that node *)
        | Node(i,lft, rgt) = sum_leaves lft + sum_leaves rgt

(* any type of tree is legal argument here: type is ('a, 'b) tree -> int *)
fun num_leaves tr =
    case tr of
    (* if recursively we get to just the leaf we return 1, so it will count up the leaves *)
        Leaf i => 1
        | Node(i, lft, rgt) = num_leaves lft + num_leaves rgt
