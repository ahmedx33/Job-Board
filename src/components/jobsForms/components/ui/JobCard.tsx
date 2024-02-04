import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
import salaryFormat from "@/utils/salaryFormat";

export default function JobCard({
    id,
    title,
    companyName,
    location,
    minSalary,
    shortDesc,
    type,
    experienceLevel,
    activeCount,
    isPreviewMode,
    fullDesc,
    applicationUrl,
    isSplashC,
    isFavoriteC

}: JobType) {
    const [limmits, setLimmits] = useState(activeCount);
    const navigate = useNavigate();
    const [value, setValue] = useState<CardsStatusType[]>(localStorage.getItem('cardsStatus') ? JSON.parse(localStorage.getItem('cardsStatus') || '[]') : [])
    const [isSplash, setIsSplash] = useState<boolean>(value && value[value.findIndex((item) => item.statusId === id)]?.isSplash || false);
    const [isFavorite, setIsFavorite] = useState<boolean>(value && value[value.findIndex((item) => item.statusId === id)]?.isFavorite);
    const days: DaysLimmit[] = [
        {
            limmit: 30,
            price: 100,
        },
        {
            limmit: 60,
            price: 175,
        },
        {
            limmit: 90,
            price: 225,
        },
    ];



    const deleteJob = async () => {
        await supabase.from("Jobs").delete().eq("id", id);
    };

    const addMoreDays = async (limmit: number) => {
        if (limmit) {
            setLimmits((prev) => prev && prev + limmit);
        }
        await supabase.from("Jobs").update({ activeCount: limmits }).eq("id", id);
    };

    const toggleSplash = () => {
        const updatedCardStatus = { statusId: id as string, isFavorite, isSplash: !isSplash };

        setValue([updatedCardStatus]);

        const storedCardsStatus = JSON.parse(localStorage.getItem('cardsStatus') || '[]');

        const index = storedCardsStatus.findIndex((item: CardsStatusType) => item.statusId === id);

        if (index !== -1) {
            storedCardsStatus[index] = updatedCardStatus;
        } else {
            storedCardsStatus.push(updatedCardStatus);
        }

        localStorage.setItem('cardsStatus', JSON.stringify(storedCardsStatus));

        setIsSplash(prev => !prev);
    }


    const toggleFavorite = () => {
        const updatedCardStatus = { statusId: id as string, isFavorite: !isFavorite, isSplash }

        const storedCardsStatus = JSON.parse(localStorage.getItem('cardsStatus') || '[]');

        const index = storedCardsStatus.findIndex((item: CardsStatusType) => item.statusId === id)

        if (index !== -1) {
            storedCardsStatus[index] = updatedCardStatus
        } else {
            storedCardsStatus.push(updatedCardStatus)
        }


        localStorage.setItem('cardsStatus', JSON.stringify(storedCardsStatus))

        setIsFavorite(prev => !prev)
    }

    return (
        (isSplashC === isSplash || isSplashC) && (isFavoriteC === isFavorite || !isFavoriteC) && (
            <div id={id} className={`mx-5 ${isSplash && 'opacity-50'}`}>
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>{title}</CardTitle>
                            {isPreviewMode ? (
                                <Button className="h-[27px]">
                                    Active - {activeCount} days left
                                </Button>
                            ) : (
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="rounded-full"
                                        onClick={toggleSplash}
                                    >
                                        {isSplash ? (
                                            <FaRegEyeSlash className="text-[1.7rem]" />
                                        ) : (
                                            <FaRegEye className="text-[1.7rem]" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="rounded-full"
                                        onClick={toggleFavorite}
                                    >
                                        {isFavorite ? (
                                            <MdOutlineFavorite className="text-red-500 text-[1.7rem]" />
                                        ) : (
                                            <MdFavoriteBorder className="text-[1.7rem]" />
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                        <CardDescription>{companyName}</CardDescription>
                        <CardDescription>{location}</CardDescription>
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" className="h-[22px] rounded-full">
                                <PiMoneyDuotone />{' '}
                                {salaryFormat(parseInt(minSalary))}
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
                    {isPreviewMode ? (
                        <CardFooter className="flex items-center justify-end gap-2">
                            <Button variant="ghost" onClick={deleteJob}>
                                Delete
                            </Button>
                            <Button variant="outline" onClick={() => navigate(`edit /${id} `)}>
                                Edit
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button>Extends</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {days.map((day) => (
                                        <DropdownMenuItem
                                            key={day.limmit}
                                            onClick={() => {
                                                addMoreDays(+day.limmit);
                                            }}
                                        >
                                            {day.limmit} Days - ${day.price}{' '}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    ) : (
                        <CardFooter className="flex items-center justify-end gap-2">
                            <Dialog>
                                <DialogTrigger>
                                    <Button>View More</Button>
                                </DialogTrigger>
                                <DialogCard
                                    title={title}
                                    companyName={companyName}
                                    minSalary={minSalary}
                                    location={location}
                                    type={type}
                                    experienceLevel={experienceLevel}
                                    fullDesc={fullDesc}
                                    applicationUrl={applicationUrl} />
                            </Dialog>
                        </CardFooter>
                    )}
                </Card>
            </div>
        )
    );
}
