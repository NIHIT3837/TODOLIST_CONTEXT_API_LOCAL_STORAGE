import { createContext,useContext } from "react";


export const TodoContext=createContext({
    todos:[{
        id: 1,
        todo: " todoMsg",
        completed: false,

        }],
        addTodo : (todo) => {},
        updateTodo: (id,todo) => {},
        removedTodo: (id) => {},
        toggleComplete :(id) => {}

});

// HOOK FOR useTodo
export const useTodo=()=>{
    return useContext(TodoContext);
}
//  PROVIDER
export const TodoProvider=TodoContext.Provider;