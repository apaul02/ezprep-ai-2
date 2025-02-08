"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { getQuestions } from "@/lib/actions/getQuestions"

export default function GetCardsTest() {
  const [prompt, setPrompt] = useState<string>("")
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async () => {
    const res = await getQuestions(prompt)
    console.log(res)
    setResult(res)
  }

  return (
    <div>
      <Input onChange={(e) => setPrompt(e.target.value)} />
      <Button onClick={handleSubmit}>Get Cards</Button>
      {prompt && <div>{prompt}</div>}
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  )
}