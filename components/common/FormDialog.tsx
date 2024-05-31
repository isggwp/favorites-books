import * as React from 'react'

// import { cn } from "@/lib/utils";
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { FormDetails } from './FormDetails'

interface PropsDeleteDialog {
  open: boolean
  setOpen: (open: boolean) => void
  mode: 'create' | 'edit' | 'view'
}

export function FormDialog({ open, setOpen, mode }: PropsDeleteDialog) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center text-base lowercase italic">
              {mode === 'view' ? 'User Details' : `${mode} User`}
            </DialogTitle>
            <section className="h-[400px] w-full overflow-y-auto">
              <FormDetails setOpen={setOpen} mode={mode} />
            </section>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="pt-5 text-center">
          <DrawerTitle className="text-base">
            {mode === 'view' ? 'User Details' : `${mode} User`}
          </DrawerTitle>
        </DrawerHeader>
        <section className="h-[400px] w-full overflow-y-auto px-3">
          <FormDetails setOpen={setOpen} mode={mode} />
        </section>
        <DrawerFooter className="pt-5">
          <DrawerClose asChild>
            <Button
              size="sm"
              className="w-full rounded-xl bg-red-500 text-white hover:bg-red-700"
              type="button"
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
