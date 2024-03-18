import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegMoon } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { addSystmeTheme, addDarkMode, addLightMode } from "@/utils/darkMode";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";

export default function RootLayout() {
    
    return (
        <>
            <div className="flex  justify-between items-center py-5 px-8 border border-transparent bg-white  border-b-mainColor dark:border-b-white mb-6  dark:bg-mainColor">
                <h1 className="text-black text-[2rem] dark:text-white">Job Board</h1>

                <div className="access-lis block max-md:hidden">
                    <LinksList />
                </div>
                <BurgerMenu className="hidden max-md:block " />
            </div>

            <Outlet />
        </>
    );
}

function BurgerMenu({ className }: { className?: string }) {
    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" asChild>
                        <span>
                            <IoMenu className="text-[2rem]" />
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-5">
                    <LinksList />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function LinksList() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            await supabase.auth.getUser().then((value) => {
                if (value.data?.user) {
                    setUser(value.data.user);
                }
            });
        };

        getUserData();
    }, []);



    const signOutHandler = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };
    return (
        <>
            {" "}
            <ul className="flex items-center gap-8 max-md:flex-col max-md:gap-4">
                <li>
                    <ThemeSwitcher />
                </li>
                <li>
                    <Button className=" text-[1.1rem] text-black dark:text-white" variant="ghost" asChild>
                        <Link to="tasks">Tasks Board</Link>
                    </Button>
                </li>
                <li>
                    <Button variant="ghost" asChild className=" text-[1.1rem] text-black dark:text-white">
                        <Link to="jobs">Job Listing</Link>
                    </Button>
                </li>
                {Object.keys(user).length === 0 ? (
                    <li>
                        <Button variant="ghost" asChild className=" text-[1.1rem] text-black dark:text-white">
                            <Link to="/">Login</Link>
                        </Button>
                    </li>
                ) : (
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <Avatar>
                                    <AvatarImage draggable={false} src="https://github.com/shadcn.png" />
                                    <AvatarFallback>JB</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mx-5">
                                <button className="w-full ">
                                    <Link to="jobs/my-listings">
                                        {" "}
                                        <DropdownMenuItem className="cursor-pointer">My Listings</DropdownMenuItem>
                                    </Link>
                                </button>
                                <button className="w-full " onClick={signOutHandler}>
                                    <DropdownMenuItem className="cursor-pointer">Sign out</DropdownMenuItem>
                                </button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                )}
            </ul>
        </>
    );
}

function ThemeSwitcher() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" asChild>
                        <span className="text-[1.1rem]">
                            <FaRegMoon />
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-5">
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
            </DropdownMenu>{" "}
        </>
    );
}
