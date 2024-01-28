/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/layouts/Root/RootLayout";
import { AddTasks } from "./features/Todo/components/services/components/AddTask";
import { TaskEdit } from "./features/Todo/components/services/components/TaskEdit";

import { supabase } from "./api/supabase";
import { Suspense, lazy } from "react";

import CreateJob from "./components/jobsForms/components/services/components/CreateJob";
import Root from "./components/auth/signUp/Root";
import JobEdit from "./components/jobsForms/components/services/components/JobEdit";
const TasksList = lazy(() => import("./features/Todo/TasksList"));
const FilterListingsForm = lazy(() => import("./components/jobsForms/FilterListingsForm"));
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                errorElement: <h1>error</h1>,
                children: [
                    { index: true, element: <Navigate to={"/tasks"} /> },
                    {
                        path: "tasks",
                        children: [
                            {
                                index: true,
                                element: <Suspense> <TasksList /></Suspense>,
                            },

                            {
                                path: "new",
                                element: <AddTasks />,
                            },

                            {
                                path: "edit/:taskId",
                                loader: async ({ params: { taskId } }) => {
                                    return await supabase.from("Tasks").select().eq("id", taskId);
                                },
                                element: <TaskEdit />,
                            },
                        ],
                    },

                    {
                        path: "jobs",
                        children: [
                            { index: true, element: <Suspense><FilterListingsForm /></Suspense> },
                            {
                                path: "new",
                                element: <CreateJob />,
                            },

                            {
                                path: "edit/:jobId",
                                loader: async ({ params: { jobId } }) => {
                                    return await supabase.from("Jobs").select().eq("id", jobId);
                                },
                                element: <JobEdit />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "signIn",
        element: <Root />,
    },
]);
