namespace TodoApp.Model {
    export interface Todo {
        id: number;
        name: string;
        state : TodoState,
    }
}

namespace TodoApp.Model {
    export enum TodoState {
        New=1,
        InProgress,
        Completed,
        Deleted, 
    }
}

namespace DataAccess {
    import Todo = TodoApp.Model.Todo;
    import TodoState = TodoApp.Model.TodoState;
    
    export interface ITodoService {
        add(todo:Todo): Todo;
        delete(todoId:number): boolean;
        getAll(): Todo[];
        getById(todoId: number): Todo;
    }
}