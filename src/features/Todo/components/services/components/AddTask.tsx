import { supabase } from "@/api/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTasks() {
    const titleValue = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const navigate = useNavigate();

    const addTask = async () => {
        const newTaskTitle = titleValue.current?.value.trim();
        const { user } = (await supabase.auth.getUser()).data

        if (
            newTaskTitle === "".trim() ||
            status === "" ||
            priority === "" ||
            category === "" ||
            (status === "" && priority === "" && category === "")
        )
            return;

        const { error } = await supabase.from("Tasks").insert({
            title: newTaskTitle,
            status,
            priority,
            category,
            userId: user?.id
        });

        if (error)
            throw new Error(
                "somthing went wrong with insert in the addTasks component"
            );

        if (titleValue.current) {
            titleValue.current.value = "";
        }

        navigate("/tasks");
    };

    return (
        <div className="p-8">
            <h1 className="text-[1.5rem] mb-10 font-bold">New Task</h1>
            <div className="flex items-center justify-center gap-7 mb-16">
                <span>
                    <label htmlFor="title">Title</label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="w-[40rem] mt-3"
                        ref={titleValue}
                    />
                </span>
                <span>
                    <label htmlFor="status">Status</label>

                    <Select value={status} onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="w-[40rem] mt-3" id="status">
                            <SelectValue placeholder="Select the status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Done">Done</SelectItem>
                                <SelectItem value="InProgress">InProgress</SelectItem>
                                <SelectItem value="Todo">Todo</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
            </div>
            <div className="flex items-center justify-center gap-7">
                <span>
                    <label htmlFor="priority">Priority</label>
                    <Select
                        value={priority}
                        onValueChange={(value) => setPriority(value)}
                    >
                        <SelectTrigger className="w-[40rem] mt-3" id="priority">
                            <SelectValue placeholder="Select the priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
                <span>
                    <label htmlFor="category">Category</label>

                    <Select
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        <SelectTrigger className="w-[40rem] mt-3" id="category">
                            <SelectValue placeholder="Select the category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Personal">Personal</SelectItem>
                                <SelectItem value="Work">Work</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
            </div>
            <div className="text-right py-10 px-[7rem]">
                <Button onClick={addTask}>Add</Button>
            </div>
        </div>
    );
}
