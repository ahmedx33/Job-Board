/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { supabase } from "./api/supabase";
import Navbar from "./components/layouts/Root/RootLayout";
import Root from "./components/auth/signUp/Root";

// Lazy-loaded components
const CreateJob = lazy(() => import("./components/jobsForms/components/services/components/CreateJob"));
const JobEdit = lazy(() => import("./components/jobsForms/components/services/components/JobEdit"));
const TaskEdit = lazy(() => import("./features/Todo/components/services/components/TaskEdit"));
const AddTasks = lazy(() => import("./features/Todo/components/services/components/AddTask"));
const TasksList = lazy(() => import("./features/Todo/pages/TasksList"));
const FilterListingsForm = lazy(() => import("./components/jobsForms/pages/FilterListingsForm"));
const MyListings = lazy(() => import("./components/jobsForms/pages/MyListings"));

export const router = createBrowserRouter([
    {
        path: "app",
        element: <Navbar />,
        children: [
            {
                errorElement: <h1>error</h1>,
                children: [
                    { index: true, element: <Navigate to="/tasks" /> },
                    {
                        path: "tasks",
                        children: [
                            {
                                index: true,
                                element: (
                                    <Suspense>
                                        <TasksList />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "new",
                                element: (
                                    <Suspense>
                                        <AddTasks />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "edit/:taskId",
                                loader: async ({ params: { taskId } }) => {
                                    return await supabase.from("Tasks").select().eq("id", taskId);
                                },
                                element: (
                                    <Suspense>
                                        <TaskEdit />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: "jobs",
                        children: [
                            {
                                index: true,
                                element: (
                                    <Suspense>
                                        <FilterListingsForm />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "new",
                                element: (
                                    <Suspense>
                                        <CreateJob />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "edit/:jobId",
                                loader: async ({ params: { jobId } }) => {
                                    return await supabase.from("Jobs").select().eq("id", jobId);
                                },
                                element: (
                                    <Suspense>
                                        <JobEdit />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "my-listings",
                                element: (
                                    <Suspense>
                                        <MyListings />
                                    </Suspense>
                                ),
                            },
                        ],
                    },

                    {},
                ],
            },
        ],
    },
    {
        path: "/",
        element: <Root />,
    },
]);
