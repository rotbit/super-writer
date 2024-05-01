"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
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

const platforms = [
  { label: "微信公众号", value: "wechat" },
  { label: "掘金社区", value: "juejin" },
  { label: "知乎", value: "zhihu" },
  { label: "Medium", value: "medium" },
]

const worktypes = [
  { label: "根据昵称采集", value: "by_author" },
  { label: "根据关键字采集", value: "by_keyword" },
]


const formSchema = z.object({
  platform: z.string({
    required_error: "请选择平台",
  }),
  worktype: z.string({
    required_error: "请选择工作类型"
  }),
  author: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

})

export default function ComboboxForm() {
  const [isOpenPlatform, setIsOpenPlatform] = useState(false)
  const [isOpenWorkType, setIsOpenWorkType] = useState(false)
  const [workType, setWorkType] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ""
    }
  })

  function onSubmit(data) {
    console.log(data)
  }

  return (
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
        { workType === "by_author" &&
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
