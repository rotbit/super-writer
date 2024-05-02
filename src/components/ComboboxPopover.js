"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { use, useState } from "react"
import {platforms, worktypes} from "@/lib/constants" 
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/router';
import { postData } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandItem,
} from "@/components/ui/command"

import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const formSchema = z.object({
  platform: z.string({
    required_error: "请选择平台",
  }),
  worktype: z.string({
    required_error: "请选择工作类型"
  }),
  author: z.string({
    message: "请选择工作类型"
  }),
  keyword: z.string({
    message: "请选择工作类型"
  }),
})

export default function ComboboxForm() {
  const [isOpenPlatform, setIsOpenPlatform] = useState(false)
  const [isOpenWorkType, setIsOpenWorkType] = useState(false)
  const [workType, setWorkType] = useState("")
  const [submitMessage, setSubmitMessage] = useState("")
  const router = useRouter();
  const [clicked, setClicked] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      keyword: ""
    }
  })

  async function onSubmit(data) {
    setClicked(true);
    const platform = data['platform'];
    const work_type = data['worktype'];
    const search_param = work_type === "by_author" ? data["author"]:data["keyword"];
    
    let body = {
      platform: platform,
      work_type: work_type,
      search_param: search_param
    }

    const rsp = await postData("/api/create_task", body);   
    if (rsp.message === "success") {
      router.reload();
    } else {
      setSubmitMessage(rsp.message)
      setClicked(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg" variant="default" className="h-7 gap-1 text-sm">
          新建
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建任务</DialogTitle>
          <DialogDescription>
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>平台类型</FormLabel>
                            <Popover open={isOpenPlatform} onOpenChange={setIsOpenPlatform}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[300px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? platforms.find(
                                        (plat) => plat.value === field.value
                                      )?.label
                                      : "选择平台"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandEmpty>没有可供选择的平台</CommandEmpty>
                                  <CommandList>
                                    {platforms.map((plat) => (
                                      <CommandItem
                                        value={plat.value}
                                        key={plat.value}
                                        onSelect={() => {
                                          form.setValue("platform", plat.value)
                                          setIsOpenPlatform(false)
                                        }}
                                      >
                                        {plat.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            plat.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="worktype"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>采集方式</FormLabel>
                            <Popover open={isOpenWorkType} onOpenChange={setIsOpenWorkType}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[300px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? worktypes.find(
                                        (worktype) => worktype.value === field.value
                                      )?.label
                                      : "选择采集方式"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandEmpty>没有可供采集方式</CommandEmpty>
                                  <CommandList>
                                    {worktypes.map((worktype) => (
                                      <CommandItem
                                        value={worktype.value}
                                        key={worktype.value}
                                        onSelect={() => {
                                          form.setValue("worktype", worktype.value)
                                          setIsOpenWorkType(false)
                                          setWorkType(worktype.value)
                                        }}
                                      >
                                        {worktype.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            worktype.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {workType === "by_author" &&
                        (<FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>作者昵称</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入作者昵称" className="w-[300px] justify-between" {...field} />
                              </FormControl>
                              <FormDescription>单个任务仅支持一个作者内容采集</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        )
                      }
                      {
                        workType == "by_keyword" &&
                        (
                          <FormField
                            control={form.control}
                            name="keyword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>关键字</FormLabel>
                                <FormControl>
                                  <Input placeholder="请输入关键字" className="w-[300px] justify-between" {...field} />
                                </FormControl>
                                <FormDescription>输入多个关键字: AIGC;stable diffusion;dalle3</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )
                      }
                      {
                        clicked ? (
                          <Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            已发送
                          </Button>
                        ) : (
                          <Button type="submit">Submit</Button>
                        )
                      }
                    </form>
                  </Form>
                </div>
              </CardContent>
              <CardFooter>
              <span className="text-red-500">
              {
                submitMessage
              }
              </span>
              </CardFooter>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
