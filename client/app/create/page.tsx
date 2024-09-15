"use client"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from "react"
import axios from "axios"

function Page() {
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  const handleSubmit = async () => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVICE_API!, {
        title: title,
        body: body,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
    } catch (error:any) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center gap-y-10 pt-10  ">
        <Input
          type="text"
          placeholder="Title"
          className="max-w-[70%]"
            value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            console.log(title)
          }}
        />
        <Textarea
          placeholder="Type your message here."
          className="max-w-[70%] h-[70vh]"
            value={body}
            onChange={(e) => {
            setBody(e.target.value)
            console.log(body)
            }}
        />
        <Button className="w-32" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </>
  )
}

export default Page
