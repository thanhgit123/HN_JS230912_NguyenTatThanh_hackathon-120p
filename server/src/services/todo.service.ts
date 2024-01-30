import database from "../utils/database";

export async function getAllTodoMysql() {
  const [result] = await database.execute("select * from todo ");
  return result;
}

export async function addTodoListMysql(newTodo: string) {
     const [result] = await database.execute(
    "insert into todo (name_todo) values (?)",
    [newTodo]
  );
  return result;
}

export async function deleteTodoMysql(id:number) {
  const [result] = await database.execute(
 "delete from todo where id = ?",
 [id]
);
return result;
}


export async function changeStatusMysql(id:number,status:number) {
  const [result] = await database.execute(
 "update todo set status=? where id = ?",
 [status,id]
);
return result;
}


