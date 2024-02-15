import { Button } from "@/components/ui/button";
import { PostgrestResponse } from "@supabase/supabase-js";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Await, Link } from "react-router-dom";
import Task from "../components/ui/Task";
import { Suspense, useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { SkeletonAmount } from "@/components/layouts/Skeleton/Skeleton";
import { Skeleton } from "@/components/ui/skeleton";

function TasksList() {
    const [tasksList, setTasksList] = useState<PromiseLike<TaskType[] | null> | null>();

    const fetchTasks = async () => {
        const { user } = (await supabase.auth.getUser()).data
        const tasksPromise = supabase
            .from("Tasks")
            .select("*")
            .eq("userId", user?.id)
            .order("id")
            .then(({ data, error }: PostgrestResponse<TaskType[]>) => {
                if (error) throw new Error("error while fetching");

                return data || [];
            }) as PromiseLike<TaskType[]>;

        setTasksList(tasksPromise);
    };

    // real time

    useEffect(() => {
        const fetchData = async () => {
            try {
                await supabase
                    .channel("jobBaord")
                    .on(
                        "postgres_changes",
                        {
                            event: "*",
                            schema: "public",
                            table: "Tasks",
                        },
                        async () => {
                            await fetchTasks();
                        }
                    )
                    .subscribe();


            } catch (error) {
                console.error("Error subscribing to changes:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        fetchTasks();

        return () => {
            setTasksList(null);
        };
    }, []);

    // **** //
    return (
        <div className="p-5 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-[2.5rem] text-white font-bold px-10">Tasks</h1>
                <Button variant="outline" asChild>
                    <Link to="new">Add Task</Link>
                </Button>
            </div>

            <div className="tasks-lists text-white flex items-center justify-center my-5 w-full ">
                <Table className="w-full border ">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Title</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-2">
                                                <FaArrowUp /> Asc
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-2">
                                                <FaArrowDown /> Dsc
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-2">
                                                <IoClose /> Clear Sorting
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableHead>
                            <TableHead>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Status</DropdownMenuTrigger>
                                </DropdownMenu>
                            </TableHead>
                            <TableHead>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Priority</DropdownMenuTrigger>
                                </DropdownMenu>
                            </TableHead>

                            <TableHead>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Category</DropdownMenuTrigger>
                                </DropdownMenu>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Suspense
                            fallback={
                                <SkeletonAmount column={true} amount={4}>
                                    <Skeleton className="m-3 h-7 w-[700px]" />
                                </SkeletonAmount>
                            }
                        >
                            <Await resolve={tasksList}>
                                {(tasks) =>
                                    tasks &&
                                    tasks?.map((task: TaskType) => (
                                        <>
                                            <Task
                                                key={task.id}
                                                id={task.id}
                                                title={task.title}
                                                status={task.status}
                                                priority={task.priority}
                                                category={task.category}
                                            />
                                        </>
                                    ))
                                }
                            </Await>
                        </Suspense>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default TasksList;
