"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { dataHeaderMain } from "./HeaderMain.data";
import { useState } from "react";
import { FormAddElement } from "../FormAddElement";
import { HeaderMainProps } from "./HeaderMain.types";


export function HeaderMain(props: HeaderMainProps) {
  const { userId } = props;
  const [typeElement, setTypeElement] = useState<"password" | "folder" | "">();
  const [OpenDialog, setOpenDialog] = useState(false)
  const [OpenDropdown, setOpenDropdown] = useState(false)
  
  const closeDialogAndDropdown = () => {
    setOpenDialog(false);
    setOpenDropdown(false);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl md:text-3xl font-semibold">All Secure Vaults</h1>
      <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
        <DropdownMenu open={OpenDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger asChild>
            <Button>
              New <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0 mr-2">
            <DropdownMenuLabel>
              <DialogTrigger asChild>
                <div className="flex flex-col">
                  {dataHeaderMain.map(({icon: Icon, typeElement, text}) => (
                    <Button 
                      key={typeElement} 
                      className="justify-start"
                      variant="ghost"
                      onClick={() => setTypeElement(typeElement)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {text}                  
                    </Button>
                  ))}                  
                </div>
              </DialogTrigger>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[825px] max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle>New Element</DialogTitle>
          </DialogHeader>
          {typeElement === 'password' && <FormAddElement userId={userId} closeDialog={closeDialogAndDropdown} />}
          {typeElement === 'folder' && ( <p>Form Folder</p>)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
