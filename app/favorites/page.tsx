"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleCard } from "@/components/article-card"
import type { Article } from "@/types/article"

export default function FavoritesPage() {
  const { data: session, status } = useSession()
  const [favorites, setFavorites] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch favorites from localStorage or the database
    // For now, we'll use mock data
    const mockFavorites: Article[] = [
      {
        id: "1",
        title: "OpenAI Announces GPT-5 with Enhanced Reasoning Capabilities",
        url: "https://example.com/openai-gpt5",
        summary:
          "OpenAI has unveiled GPT-5, the latest iteration of its large language model with significantly improved reasoning capabilities and reduced hallucinations.",
        source: "TechCrunch",
        imageUrl: "/placeholder.svg?height=300&width=400",
        publishedAt: "2025-03-07T14:30:00Z",
        topics: ["AI", "LLMs", "OpenAI"],
      },
      {
        id: "3",
        title: "Tesla Unveils New Humanoid Robot for Manufacturing",
        url: "https://example.com/tesla-robot",
        summary:
          "Tesla has revealed its latest humanoid robot designed to handle dangerous and repetitive tasks in manufacturing environments.",
        source: "Hacker News",
        imageUrl: "/placeholder.svg?height=300&width=400",
        publishedAt: "2025-03-05T16:45:00Z",
        topics: ["Robotics", "Tesla", "Manufacturing"],
      },
    ]

    setFavorites(mockFavorites)
    setLoading(false)
  }, [])

  if (status === "loading") {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Please sign in to view your favorites</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Favorites</CardTitle>
          <CardDescription>Articles you've saved for later</CardDescription>
        </CardHeader>
      </Card>

      {loading ? (
        <div>Loading your favorites...</div>
      ) : favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p>You haven't saved any articles yet.</p>
            <p className="text-muted-foreground">
              Browse the feed and click the bookmark icon to save articles for later.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

