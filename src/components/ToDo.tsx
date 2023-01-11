import React, {useState} from "react";
import {IToDo, newCategoryState, toDoState} from "../atoms";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import "../style/toDo.scss";
import {useForm} from "react-hook-form";

function ToDo({text, id, category}:IToDo) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = (newCategory:IToDo["category"]) => {
        setToDos(oldToDos => {
            const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = {text, id, category: newCategory};
            return [...oldToDos.slice(0, targetIdx), newToDo, ...oldToDos.slice(targetIdx + 1)];
        });
    }
    
    const newCategory = useRecoilValue(newCategoryState);
    const defaultCategory = ["TO_DO", "DOING", "DONE"];
    const allCategory = [...defaultCategory, ...Object.keys(newCategory)];
    const onDelete = () => {
        setToDos(oldToDos => (oldToDos.filter((toDo) => toDo.id !== id)));
    }
    
    const [modify, setModify] = useState(true);
    const onModify = (event:React.MouseEvent<HTMLButtonElement>) => {
        const input = event.currentTarget.previousElementSibling;
        if(modify) {
            input?.classList.add('on');
            // input?.removeAttribute('disabled');
        } else{
            input?.classList.remove('on');
            // input?.setAttribute('disabled', '');
        }
        
        setModify((prev) => !prev);
    }
    interface IFormItem {
        toDoItem : string;
    }
    const {register, handleSubmit} = useForm<IFormItem>({
        defaultValues: {
            toDoItem: text
        }
    });
    const onValid = ({toDoItem}:IFormItem) => {
        setToDos(oldToDos => {
            const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = {text: toDoItem, id, category};
            return [...oldToDos.slice(0, targetIdx), newToDo, ...oldToDos.slice(targetIdx + 1)];
        })
    }
    
    return (
        <li className="list">
            <div className="btn_list">
                {allCategory.map(item => {
                    if(item !== category) return <button onClick={() => onClick(item)}>{item}</button>;
                })}
            </div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDoItem")}
                />
                <button onClick={onModify} className="btn_modify">
                    <img src="../../public/img/ico_write.png" alt=""/>
                </button>
                <button onClick={onDelete} className="btn_delete">
                    <img src="../../public/img/ico_delete.png" alt=""/>
                </button>
            </form>
            {/*<span>{text}</span>*/}
            {/*{!modify ? null : (*/}
            {/*    <form onSubmit={handleSubmit(onValid)}>*/}
            {/*        <input*/}
            {/*            {...register("toDoItem")}*/}
            {/*        />*/}
            {/*    </form>*/}
            {/*)}*/}
            {/*<button onClick={onModify}>수정</button>*/}
        </li>
    )
}

export default ToDo;