import { ChangeEvent, useEffect, useState } from "react";
import "./TodoList.css";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import publicAxios from "./config/publicAxios";
export default function TodoList() {
  type Obj = {
    id: number;
    name_todo: string;
    status: number;
  };
  const [getTodo, setGetTodo] = useState<Obj[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [flag,setFlag] = useState<boolean>(false)

  const handleGetTodo = async () => {
    try {
      const respone = await publicAxios.get("/api/v1/todo/getAll");
      setGetTodo(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetTodo();
  },[flag]);

  const handleAdd = async () => {
    try {
      const respone = await publicAxios.post("/api/v1/todo/addTodo", {
        newTodo,
      });
      setNewTodo("")
      setFlag(!flag)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete= async(id:number)=>{
    try {
        const respone = await publicAxios.delete(`/api/v1/todo/delete/${id}`)
        setFlag(!flag)
    } catch (error) {
        console.log(error)
    }
  }

  const changeStatus = async( e:ChangeEvent<HTMLInputElement>,id:number)=>{
        try {
            const change = await publicAxios.put(`/api/v1/todo/change/${id}`,{status:e.target.checked?1:0})
            setFlag(!flag)  
        } catch (error) {
            console.log(error)
        }
  }

  return (
    <>
      <div className="bg-red-400 shadow-xl h-[580px] w-[50vw] pb-8  mx-auto mt-3">
        <p className="text-center pt-5">Task List</p>
        <div className="input-container w-[35vw] mx-auto mt-3 ">
          <input
            required
            placeholder="Write here"
            type="email"
            className=""
            name="todo"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="invite-btn" type="button" onClick={handleAdd}>
            add
          </button>
        </div>

        <div className="myScroll bg-sky-50 mt-4 mx-[115px]  overflow-y-auto  max-h-[270px]">
          {getTodo.map((item, index) => {
            return (
              <div
                className=" h-[40px] rounded-[2px] flex justify-between "
                key={index}
              >
                <div>
                  <input type="checkbox" checked = {item.status === 1 ? true : false} value="" className=" mt-3 ml-3" onChange={(e)=>changeStatus(e,item.id)}/>
                  <label htmlFor="" className="pl-2 " style={{textDecoration:item.status === 1 ? 'line-through' : ""}} >
                    {item.name_todo}
                  </label>
                </div>
                <div className="flex w-[50px] justify-between">
                  <button>
                    <FaPencilAlt className="text-red-400 mr-2" />
                  </button>
                  <button className="mr-2">
                    <MdDelete className="text-red-400 text-xl" onClick={()=>handleDelete(item.id)} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

            <div className="bg-rose-50 mx-[115px] mt-5 pl-3 h-9 pt-1">
            <p>Finished task :{getTodo.length}</p>
            </div>
      </div>
    </>
  );
}
