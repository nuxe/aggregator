"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const topics = [
  { id: "ai", label: "Artificial Intelligence" },
  { id: "ml", label: "Machine Learning" },
  { id: "llms", label: "Large Language Models" },
  { id: "robotics", label: "Robotics" },
  { id: "startups", label: "Startups" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "blockchain", label: "Blockchain" },
  { id: "iot", label: "Internet of Things" },
  { id: "vr-ar", label: "VR/AR" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const handleTopicChange = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleSubmit = async () => {
    // In a real app, we would save the user's preferences to the database
    console.log("Selected topics:", selectedTopics)

    // Redirect to the home page
    router.push("/")
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to TechNews</CardTitle>
          <CardDescription>Select at least 3 topics you're interested in to personalize your feed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <div key={topic.id} className="flex items-start space-x-2">
                <Checkbox
                  id={topic.id}
                  checked={selectedTopics.includes(topic.id)}
                  onCheckedChange={() => handleTopicChange(topic.id)}
                />
                <Label
                  htmlFor={topic.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {topic.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={selectedTopics.length < 3} className="w-full">
            Continue to my feed
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

