datatype mytype = TwoInts of int*int
                | Str of string
                | Pizza

(* if we call it with a string we get back a mytype, the value is Str of "hi", tells us what kind of mytype we have  *)
(* constructure applied to value is the value *)
val a = Str "hi"
val b = Str
val c = Pizza
val d = TwoInts(1+2,3+4)
val e = a
