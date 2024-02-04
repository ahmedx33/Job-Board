import { Link, Outlet } from "react-router-dom";
import { FaRegMoon } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { addSystmeTheme, addDarkMode, addLightMode } from "@/utils/darkMode";
import { Button } from "@/components/ui/button";

export default function RootLayout() {
    return (
        <>
            <div className="flex  justify-between items-center py-5 px-8 border border-transparent bg-white  border-b-mainColor dark:border-b-white mb-6  dark:bg-mainColor">
                <h1 className="text-black text-[2rem] dark:text-white">Job Board</h1>

                <div className="access-lis">
                    <ul className="flex items-center gap-8 ">
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" asChild>
                                        <span className="text-[1.1rem]">
                                            <FaRegMoon />
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <button className="w-full" onClick={addLightMode}>
                                        <DropdownMenuItem>Light</DropdownMenuItem>
                                    </button>
                                    <button className="w-full" onClick={addDarkMode}>
                                        <DropdownMenuItem>Dark</DropdownMenuItem>
                                    </button>
                                    <button className="w-full" onClick={addSystmeTheme}>
                                        <DropdownMenuItem>System</DropdownMenuItem>
                                    </button>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <Button
                                className=" text-[1.1rem] text-black dark:text-white"
                                variant="ghost"
                                asChild
                            >
                                <Link to="/tasks">Tasks Board</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                asChild
                                className=" text-[1.1rem] text-black dark:text-white"
                            >
                                <Link to="/jobs">Job Listing</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                asChild
                                className=" text-[1.1rem] text-black dark:text-white"
                            >
                                <Link to="/">User</Link>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    );
}
