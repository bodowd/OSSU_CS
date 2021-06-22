fun countup_from1 (x:int) =
    let
        fun count (from: int) =
        (* count(3,6) -> [3,4,5,6] *)
        (* x is available in the environment for this let expression because it comes from outside *)
            if from=x
            then x::[]
            else from :: count(from+1)
    in
    (* count can be used in  *)
        count(1)
    end
