'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MoreIcon from '../icons/MoreIcon';



export default function CustomDropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <MoreIcon className='w-5 h-5'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>수정하기</DropdownMenuItem>
        <DropdownMenuItem>삭제하기</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
