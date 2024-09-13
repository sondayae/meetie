'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import MoreIcon from '../icons/MoreIcon';
import Button from '../common/Button';

type DropDownMenu = {
  handleEdit: () => void;
  handleDelete: () => void;
  deleteDialogOption: {
    title: string;
    message: string;
  }
}

export default function Dropdown({handleEdit, handleDelete, deleteDialogOption}: DropDownMenu) {
  return (
  <>
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreIcon className='stroke-black'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleEdit}>수정하기</DropdownMenuItem>
          <DialogTrigger className='w-full'>
            <DropdownMenuItem>삭제하기</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deleteDialogOption.title}</DialogTitle>
          <DialogDescription>
            {deleteDialogOption.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className='bg-primary text-white rounded-lg px-2' onClick={handleDelete}>확인</button>
          </DialogClose>
          <DialogClose asChild>
            <button className='border border-border rounded-lg px-2'>취소</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
  </Dialog>
  </>
  )
}