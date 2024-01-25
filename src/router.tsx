/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/layouts/Root/RootLayout";
import { AddTasks } from "./features/Task/components/services/addTasks/AddTasks";
import { TasksEdit } from "./features/Task/components/services/TasksEdit";

import { supabase } from "./api/supabase";

import CreateJob from "./components/jobsForms/components/services/CreateJob";
import Root from "./components/auth/signUp/Root";
import JobEdit from "./components/jobsForms/components/services/JobEdit";
import { Suspense, lazy } from "react";
const TasksList = lazy(() => import("./features/Task/TasksList/TasksList"));
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
                                element: <TasksList />,
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
                                element: <TasksEdit />,
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
