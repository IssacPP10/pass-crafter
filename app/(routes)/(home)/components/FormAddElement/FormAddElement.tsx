"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormAddElement.form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Earth, Eye, Shuffle } from "lucide-react"
import { copyClipboard } from "@/lib/CopyClipboard"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { generatePassword } from "@/lib/generatePassword"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { useRouter } from "next/navigation"
import { FormAddElementProps } from "./FormAddElement.types"


export function FormAddElement(props: FormAddElementProps) {
  const {userId, closeDialog} = props;
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeElement: "",
      isFavourite: false,
      name:"",
      directory:"",
      username:"",
      password:"",
      urlWebsite:"",
      notes:"",
      userId,
    },
  })
  
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/items", values);
      toast({title:"Item created ✅"});

      form.reset({
        typeElement: "",
        isFavourite: false,
        name:"",
        directory:"",
        username:"",
        password:"",
        urlWebsite:"",
        notes:"",        
      });
      closeDialog();
      router.refresh();
    } catch (error) {
      const e = error as Error;
      toast({
        title:"Something went wrong",
        description: e.message || "An unknown error occurred",
        variant:"destructive"
      })
    }
  };

  
  const generateRandomPassword = () => {
    const password = generatePassword()
    form.setValue("password", password)
  }
  const updateUrl = () => {
    form.setValue("urlWebsite", window.location.href);
  };

  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 gap-y-2 gap-x-4 grid">
        <FormField
          control={form.control}
          name="typeElement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What kind of element do you need?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a directory for your password" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Login">Login Credentials</SelectItem>
                  <SelectItem value="Card">Credit/Debit Card</SelectItem>
                  <SelectItem value="Identity">Personal Identity</SelectItem>
                </SelectContent>                
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFavourite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you want to select your password as a favourite?</FormLabel>
              <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Mark as favorite</FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
          control={form.control}
          name="directory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Directory</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please choose the directory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                </SelectContent>                
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UserName</FormLabel>
            <FormControl>
              <div className="relative">
              <Input {...field} />
              <Copy className="absolute top-3 right-4 cursor-pointer" size={18}
               onClick={() => (
                copyClipboard(field.value, toast)
               )}
               />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="urlWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Url Website</FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} />
                <Earth className="absolute top-3 right-2 cursor-pointer" size={18} 
                onClick={updateUrl}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex justify-between">Password
            <Shuffle className="cursor-pointer" size={15} 
            onClick={generateRandomPassword}
            />
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} type={showPassword ? "text" : "password"} />
                <Eye className="absolute top-3 right-10 cursor-pointer" size={18} 
                onClick={() => setShowPassword(!showPassword)}
                />
                <Copy className="absolute top-3 right-2 cursor-pointer" size={18}
                onClick={() => copyClipboard(field.value, toast)}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <div>
          <div className="text-slate-400 flex items-center justify-between text-sm">
            TOTP Authentication
            <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">Premium</p>
          </div>
          <Input className="mt-1" disabled />
        </div>
        <FormField 
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <div />
        <Button type="submit">Save</Button>
      </form>
    </Form>
    </div>
  )
}
