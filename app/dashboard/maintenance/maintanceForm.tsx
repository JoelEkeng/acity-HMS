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
import { Input } from "@/components/dashboard/input"
import { Textarea } from "@/components/dashboard/textarea"
import { useState } from "react"

const formSchema = z.object({
  category: z.string().nonempty({ message: "Select a category" }),
  roomNumber: z.string().min(1, "Room number is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.any().optional(),
})

export function MaintenanceForm() {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      roomNumber: "",
      title: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("category", values.category)
    formData.append("roomNumber", values.roomNumber)
    formData.append("title", values.title)
    formData.append("description", values.description)
    if (file) {
      formData.append("image", file)
    }

    console.log("Submitted Values:", values)
    console.log("File:", file)

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select a category</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Internet">Wi-Fi / Internet</option>
                  <option value="Other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. B202" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Fan not working" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the issue in detail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Upload Image/Video (optional)
          </label>
          <input
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0]
              if (selectedFile) setFile(selectedFile)
            }}
            className="block w-full border rounded-md p-2"
          />
        </div>

        <Button type="submit" className="bg-red-500 rounded-full">Submit Maintenance Request</Button>
      </form>
    </Form>
  )
}
