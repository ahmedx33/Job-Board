import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiMoneyDuotone } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
export default function DialogCard({ title, companyName, salary, location, type, experienceLevel, fullDesc, applicationUrl }: JobType) {

    const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{companyName}</DialogDescription>
                    <DialogDescription>{location}</DialogDescription>
                    <div className="flex items-center gap-2 my-3">
                        <Button variant="secondary" className="h-[22px] rounded-full">
                            <PiMoneyDuotone />
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

                    <a href={applicationUrl} target="_blank" className="flex items-center my-3"><Button>Apply On Company Site <FaExternalLinkAlt className="mx-3" /></Button></a>


                </DialogHeader>

                <p className="mt-6">{fullDesc}</p>

            </DialogContent>
        </>
    )
}
