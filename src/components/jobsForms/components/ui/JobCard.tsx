import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiMoneyDuotone } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { supabase } from "@/api/supabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import DialogCard from "./DialogCard";
import { useLocalStorage } from "@/hooks/useLocalStorage.hook";


export default function JobCar({
    id,
    title,
    companyName,
    location,
    salary,
    shortDesc,
    type,
    experienceLevel,
    activeCount,
    isPreviewMode,
    fullDesc,
    applicationUrl
}: JobType
) {
    const [limmits, setLimmits] = useState(activeCount);
    const navigate = useNavigate();

    const [value, setValue] = useLocalStorage(`cardStatus`, "[]");
    const [isSplash, setIsSplash] = useState<boolean>(value ? JSON.parse(value).isSplash : false);
    const [isFavorite, setIsFavorite] = useState<boolean>(value ? JSON.parse(value).isFavorite : false);
    const days: DaysLimmit[] = [{
        limmit: 30,
        price: 100
    },
    {
        limmit: 60,
        price: 175
    },
    {
        limmit: 90,
        price: 225
    }
    ]

    const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const deleteJob = async () => {
        await supabase.from("Jobs").delete().eq("id", id);
    }

    const addMoreDays = async (limmit: number) => {
        if (limmit) {
            setLimmits(prev => prev && prev + limmit);
        }
        await supabase.from("Jobs").update({ activeCount: limmits }).eq("id", id)
    }


    const toggleIsSplash = () => {
        setIsSplash(prev => !prev);
        setValue(JSON.stringify({ isSplash: !isSplash, isFavorite }));
    }

    const toggleIsFavorite = () => {
        setIsFavorite(prev => !prev);
        setValue(JSON.stringify({ isSplash, isFavorite: !isFavorite }));
    }




    return (
        <div id={id} className="mx-5">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{title}</CardTitle>
                        {isPreviewMode ?
                            <Button className="h-[27px]">
                                Active - {activeCount} days left
                            </Button> : <div>
                                <Button variant="ghost" className="rounded-full" onClick={toggleIsSplash}>
                                    {isSplash ? <FaRegEyeSlash className="text-[1.7rem]" /> : <FaRegEye className="text-[1.7rem]" />}
                                </Button>
                                <Button variant="ghost" className="rounded-full" onClick={toggleIsFavorite}>
                                    {isFavorite ? <MdOutlineFavorite className="text-red-500 text-[1.7rem]" /> : <MdFavoriteBorder className="text-[1.7rem]" />}
                                </Button>
                            </div>}
                    </div>
                    <CardDescription>{companyName}</CardDescription>
                    <CardDescription>{location}</CardDescription>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" className="h-[22px] rounded-full">
                            <PiMoneyDuotone />{" "}
                            {USDollar.format(parseInt(salary)).split(".00").join("")}
                        </Button>
                        <Button variant="secondary" className="h-[22px] rounded-full">
                            <FaCalendarAlt />
                            {type}
                        </Button>
                        <Button variant="secondary" className="h-[22px] rounded-full">
                            <LuGraduationCap />
                            {experienceLevel}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="mb-7">
                    <p>{shortDesc}</p>
                </CardContent>
                {isPreviewMode ?
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button variant="ghost" onClick={deleteJob}>
                            Delete
                        </Button>
                        <Button variant="outline" onClick={() => navigate(`edit/${id}`)}>
                            Edit
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button>Extends</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {days.map(day => <DropdownMenuItem onClick={() => {
                                    addMoreDays(+day.limmit);
                                }}>{day.limmit} Days - ${day.price} </DropdownMenuItem>)}
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </CardFooter> :
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Dialog>
                            <DialogTrigger>
                                <Button>
                                    View More
                                </Button>
                            </DialogTrigger>
                            <DialogCard title={title} companyName={companyName} salary={salary} location={location} type={type} experienceLevel={experienceLevel} fullDesc={fullDesc} applicationUrl={applicationUrl} />
                        </Dialog>
                    </CardFooter>}

            </Card>
        </div>
    );
}
