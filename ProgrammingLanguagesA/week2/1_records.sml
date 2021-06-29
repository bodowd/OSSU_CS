val x = {bar=(1+2, true andalso true), foo=3+4, baz=(false,9)}

val my_niece = {name="Amelia", id= 41123 - 12}

(* get the corresponding piece of a record *)
#id my_niece;

val brain_part = {id=true, ego=false, superego=false}

(* #h {f=3, g=12} will result in a type error because the type checker can tell statically that there is no field named h within the record *)
