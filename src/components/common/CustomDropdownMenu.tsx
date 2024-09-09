'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MoreIcon from '../icons/MoreIcon';



export default function CustomDropDownMenu({handleEdit, handleDelete}: {handleEdit: any, handleDelete: any}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <MoreIcon className='stroke-black'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>수정하기</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>삭제하기</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
