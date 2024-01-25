import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaRegCheckCircle } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { RiTodoLine } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineWork } from 'react-icons/md';
import { TableCell, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { supabase } from '@/api/supabase';
import { useNavigate } from 'react-router-dom';

export default function Task({ id, title, status, category, priority }: TaskType) {
    const navigate = useNavigate();

    async function deleteTask() {
        const { error } = await supabase.from('Tasks').delete().eq('id', id);

        if (error) {
            throw new Error('Error with delete request in deleteTask function');
        }
    }

    const getIcon = (value: string): React.ReactNode => {
        const iconMap: Record<string, Record<string, React.ReactNode>> = {
            priority: { High: <FaArrowUp />, Medium: <FaArrowLeft />, Low: <FaArrowDown /> },
            category: { Personal: <IoPersonOutline />, Work: <MdOutlineWork /> },
            status: { Done: <FaRegCheckCircle />, InProgress: <GrInProgress />, Todo: <RiTodoLine /> },
        };

        return iconMap[value][value === 'status' ? status : value === 'priority' ? priority : category];
    };
    return (
        <TableRow id={id}>
            <TableCell>
                <span className="text-black dark:text-white">{title}</span>
            </TableCell>
            <TableCell>
                <span className="flex items-center gap-2 text-black dark:text-white">
                    {getIcon('status')}
                    {status}
                </span>
            </TableCell>
            <TableCell>
                <span className="flex items-center gap-2 text-black dark:text-white">
                    {getIcon('priority')} {priority}
                </span>
            </TableCell>
            <TableCell>
                <span className="flex items-center gap-2 text-black dark:text-white">
                    {getIcon('category')}
                    {category}
                </span>
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" asChild>
                            <span className="text-black dark:text-white ">
                                <span className="text-[1.3rem]">
                                    <IoIosMore />
                                </span>
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate(`edit/${id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={deleteTask}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}

