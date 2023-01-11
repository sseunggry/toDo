import React from "react";
import CreateToDo from "./CreateToDo";
import {categoryState, newCategoryState, toDoSelector, toDoState} from "../atoms";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import ToDo from "./ToDo";
import {useForm} from "react-hook-form";
import "../style/toDoList.scss";

interface IFormSelect {
    addCategory: string;
}

function ToDoList() {
    const [newCategory, setNewCategory] = useRecoilState(newCategoryState);
    const {register, handleSubmit, setValue} = useForm<IFormSelect>();
    const onValid = ({addCategory}:IFormSelect) => {
        if(!addCategory) return;
        Object.keys(newCategory).map((text) => {
            if(text === addCategory) alert("이미 있는 카테고리 입니다!!");
        })

        setNewCategory((prev) => {
            console.log(prev, addCategory, Object.keys(newCategory));
            return {
                ...prev,
                [addCategory]: []
            }
        })

        setValue("addCategory", "");
    }
    
    const setToDo = useSetRecoilState(toDoState);
    const setCategory = useSetRecoilState(categoryState);
    const toDos = useRecoilValue(toDoSelector);
    
    const sortListClick = (event:React.MouseEvent<HTMLLIElement>) => {
        setCategory(event.currentTarget.textContent as any);
    
        if(!event.currentTarget.parentElement) return;
        
        const list = Object.values(event.currentTarget.parentElement?.querySelectorAll('li'));
        list.map((value) => value.classList.remove('active'))
        event.currentTarget.classList.add('active');
    }
    const deleteAll = () => {
        setToDo([]);
        setNewCategory([]);
    }

    return (
        <div className="todo_list">
            <h1>TODO LIST</h1>
    
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("addCategory")}
                    placeholder="Write a select word"
                />
            </form>
            <ul className="sort_list">
                <li onClick={sortListClick} className="active">TO_DO</li>
                <li onClick={sortListClick}>DOING</li>
                <li onClick={sortListClick}>DONE</li>
                {Object.keys(newCategory).map((sort) => (
                    <li onClick={sortListClick}>{sort}</li>
                ))}
            </ul>
            
            <CreateToDo />
            
            <ul>
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo}/>
                ))}
            </ul>
            <button onClick={deleteAll} className="btn_del">Delete All</button>
        </div>
    )
}

export default ToDoList;