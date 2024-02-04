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

import { PiMoneyDuotone } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import DialogCard from "./DialogCard";
import salaryFormat from "@/utils/salaryFormat";

export default function JobCard({
    title,
    companyName,
    location,
    minSalary,
    shortDesc,
    type,
    experienceLevel,
    fullDesc,
    applicationUrl,

}: JobFormData) {

    return (
        <div className={`mx-5 opacity-50'}`}>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{title}</CardTitle>
                        <div>
                            <Button
                                variant="ghost"
                                className="rounded-full"
                            >
                                <FaRegEye className="text-[1.7rem]" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="rounded-full"
                            >
                                <MdFavoriteBorder className="text-[1.7rem]" />
                            </Button>
                        </div>
                    </div>
                    <CardDescription>{companyName}</CardDescription>
                    <CardDescription>{location}</CardDescription>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" className="h-[22px] rounded-full">
                            <PiMoneyDuotone />{' '}
                            {salaryFormat(parseInt(minSalary as string))}
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
            </Card>
        </div >
    )
}
