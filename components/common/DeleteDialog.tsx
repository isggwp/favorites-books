import * as React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import {toast} from 'react-hot-toast'
import { RootState } from '@/lib/redux/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import { deleteUsers } from '@/lib/redux/slices/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

interface PropsDeleteDialog {
  open: boolean
  setOpen: (open: boolean) => void
}

export function DeleteDialog({ open, setOpen }: PropsDeleteDialog) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const dispatch = useDispatch()
  const streamUsers = useSelector((state: RootState) => state.users.streamUsers);


  const onDelete = async () => {
    await dispatch(deleteUsers(streamUsers))

    toast.success('User deleted successfully!')
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Delete Confirmation
            </DialogTitle>
            <DialogDescription className="mx-auto py-4 text-center">
              Are you sure you want to delete <strong>{streamUsers?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full flex-row space-x-4 justify-between">
              <Button
                size="sm"
                className="w-full rounded-xl bg-red-500 text-sm text-white hover:bg-red-700"
                type="button"
                onClick={onDelete}
              >
                Yes
              </Button>
              <DialogClose className="w-full">
               <Button
                  size="sm"
                  className="w-full rounded-xl bg-white text-sm text-red-500 ring-red-500  hover:text-red-400 hover:ring-red-400"
                  type="button"
                  variant={'outline'}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="pt-5 text-center">
          <DrawerTitle className="text-base">Delete Confirmation</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete <strong>{streamUsers?.name}</strong>?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-5">
          <div className="flex w-full flex-col justify-between space-y-3">
            <Button
              size="sm"
              className="w-full rounded-xl bg-red-500 text-sm text-white hover:bg-red-700"
              type="button"
              onClick={onDelete}
            >
              Yes
            </Button>
            <DrawerClose asChild>
              <Button
                size="sm"
                className="w-full rounded-xl bg-white text-sm text-red-500 ring-red-500  hover:text-red-400 hover:ring-red-400"
                type="button"
                variant={'outline'}
              >
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
