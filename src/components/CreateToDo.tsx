import React from "react";
import {useForm} from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, toDoState} from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onValid = ({toDo}:IForm) => {
        console.log(toDo, category);
        setToDos(oldToDos => [{text: toDo, id: Date.now(), category}, ...oldToDos]);
        setValue("toDo", "");
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", {required : "Please write a To Do"})}
                    placeholder="Write a to do"
                />
                {/*<button>Add</button>*/}
            </form>
        </div>
    )
}

export default CreateToDo;