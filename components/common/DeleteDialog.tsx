import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  //   DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  //   DrawerTrigger,
} from "@/components/ui/drawer";

interface PropsDeleteDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DeleteDialog({ open, setOpen }: PropsDeleteDialog) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Delete Confirmation
            </DialogTitle>
            <DialogDescription className="py-4 mx-auto text-center">
              Are you sure you want to delete this item?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size="sm"
              className="w-full rounded-xl bg-red-500 hover:bg-red-700 text-white text-sm"
              type="button"
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="text-center pt-5">
          <DrawerTitle className="text-base">Delete Confirmation</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this item?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-5">
          <DrawerClose asChild>
            <Button
              size="sm"
              className="w-full rounded-xl bg-red-500 hover:bg-red-700 text-white text-sm"
              type="button"
            >
              Yes
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
