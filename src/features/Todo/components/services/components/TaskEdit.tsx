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
import { useLoaderData, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";


export default function TaskEdit() {
    const titleValue = useRef<HTMLInputElement>(null);
    const { taskId } = useParams();
    const { data } = useLoaderData() as { data: TaskType[] };
    const [status, setStatus] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    async function updataTask() {
        const newTaskTitle = titleValue.current?.value.trim();

        if (newTaskTitle === "".trim()) {
            toast.error("Title Cannot Be Empty");
            return;
        } else if (status === "") {
            toast.error("Status Cannot Be Empty");
            return;
        } else if (priority === "") {
            toast.error("Priority Cannot Be Empty");
            return;
        } else if (category === "") {
            toast.error("Category Cannot Be Empty");
            return;
        }
        const { error } = await supabase
            .from("Tasks")
            .update({
                title: newTaskTitle,
                status,
                priority,
                category,
            } as TaskType)
            .eq("id", taskId);

        if (error) {
            return toast.error("Something Went Wrong, Please Try Again!!");
        }

        toast.success("Changes Are Saved Succssuflly");
    }

    console.log(data[0].status)

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
                        defaultValue={data[0].title}
                    />
                </span>
                <span>
                    <label htmlFor="status">Status</label>

                    <Select value={status} onValueChange={(value) => setStatus(value)} defaultValue={data[0].status}>
                        <SelectTrigger className="w-[40rem] mt-3" id="status">
                            <SelectValue placeholder={data[0].status} />
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
                        defaultValue={data[0].priority}
                    >
                        <SelectTrigger className="w-[40rem] mt-3" id="priority">
                            <SelectValue placeholder={data[0].priority} />
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
                        defaultValue={data[0].category}
                    >
                        <SelectTrigger className="w-[40rem] mt-3" id="category">
                            <SelectValue placeholder={data[0].category} />
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
                <Button onClick={updataTask}>Save</Button>
            </div>
        </div>
    );
}
