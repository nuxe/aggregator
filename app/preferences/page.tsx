"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { XIcon } from "lucide-react"

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

const sources = [
  { id: "techcrunch", label: "TechCrunch" },
  { id: "hackernews", label: "Hacker News" },
  { id: "arxiv", label: "ArXiv" },
  { id: "mittr", label: "MIT Tech Review" },
  { id: "wired", label: "Wired" },
  { id: "verge", label: "The Verge" },
]

export default function PreferencesPage() {
  const router = useRouter()
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["ai", "ml", "llms"])
  const [selectedSources, setSelectedSources] = useState<string[]>(["techcrunch", "hackernews", "arxiv", "mittr"])
  const [blockedKeywords, setBlockedKeywords] = useState<string[]>(["crypto", "NFT"])
  const [newKeyword, setNewKeyword] = useState("")

  const handleTopicChange = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleSourceChange = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  const addBlockedKeyword = () => {
    if (newKeyword && !blockedKeywords.includes(newKeyword)) {
      setBlockedKeywords([...blockedKeywords, newKeyword])
      setNewKeyword("")
    }
  }

  const removeBlockedKeyword = (keyword: string) => {
    setBlockedKeywords(blockedKeywords.filter((k) => k !== keyword))
  }

  const handleSubmit = async () => {
    // In a real app, we would save the user's preferences to the database
    console.log("Preferences:", {
      topics: selectedTopics,
      sources: selectedSources,
      blockedKeywords,
    })

    // Redirect to the home page
    router.push("/")
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Preferences</CardTitle>
          <CardDescription>Customize your news feed by selecting topics, sources, and blocked keywords</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Topics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`topic-${topic.id}`}
                    checked={selectedTopics.includes(topic.id)}
                    onCheckedChange={() => handleTopicChange(topic.id)}
                  />
                  <Label
                    htmlFor={`topic-${topic.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {topic.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">News Sources</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sources.map((source) => (
                <div key={source.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`source-${source.id}`}
                    checked={selectedSources.includes(source.id)}
                    onCheckedChange={() => handleSourceChange(source.id)}
                  />
                  <Label
                    htmlFor={`source-${source.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {source.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Blocked Keywords</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Articles containing these keywords will be filtered out of your feed
            </p>
            <div className="flex mb-4">
              <Input
                className="mr-2"
                placeholder="Add keyword to block..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addBlockedKeyword()
                  }
                }}
              />
              <Button onClick={addBlockedKeyword}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {blockedKeywords.map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                  <XIcon className="ml-1 h-3 w-3 cursor-pointer" onClick={() => removeBlockedKeyword(keyword)} />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

