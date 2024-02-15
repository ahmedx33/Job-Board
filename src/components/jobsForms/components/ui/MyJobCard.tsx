import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PiMoneyDuotone } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { supabase } from "@/api/supabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DialogCard from "./DialogCard";
import salaryFormat from "@/utils/salaryFormat";

export default function MyJobCard({ id, title, companyName, location, minSalary, shortDesc, type, experienceLevel, activeCount, fullDesc, applicationUrl }: JobType) {
      const [limmits, setLimmits] = useState(activeCount);
      const navigate = useNavigate();
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

      return (
            <div id={id}>
                  <Card className="w-full">
                        <CardHeader>
                              <div className="flex items-center justify-between">
                                    <CardTitle>{title}</CardTitle>
                                    <Button className="h-[27px]">Active - {activeCount} days left</Button>
                              </div>
                              <CardDescription>{companyName}</CardDescription>
                              <CardDescription>{location}</CardDescription>
                              <div className="flex items-center gap-2">
                                    <Button variant="secondary" className="h-[22px] rounded-full">
                                          <PiMoneyDuotone /> {salaryFormat(parseInt(minSalary))}
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
                              <Button className="hover:text-red-500" variant="ghost" onClick={deleteJob}>
                                    Delete
                              </Button>
                              <Button variant="outline" onClick={() => navigate(`/jobs/edit/${id} `)}>
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
                                                      {day.limmit} Days - ${day.price}{" "}
                                                </DropdownMenuItem>
                                          ))}
                                    </DropdownMenuContent>
                              </DropdownMenu>
                        </CardFooter>
                  </Card>
            </div>
      );
}
