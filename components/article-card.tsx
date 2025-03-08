"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLinkIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import type { Article } from "@/types/article"
import { formatDate } from "@/lib/utils"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { data: session } = useSession()
  const [isFavorite, setIsFavorite] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, we would save this to localStorage or the database
  }

  const handleFeedback = async (type: "up" | "down") => {
    if (!session) return

    setFeedback(type)
    // In a real app, we would save this feedback to the database
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {article.imageUrl && (
            <div className="relative h-48 w-full md:h-auto md:w-1/4">
              <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          )}
          <div className={`flex-1 p-4 ${article.imageUrl ? "md:w-3/4" : "w-full"}`}>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{article.source}</Badge>
              <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</span>
            </div>
            <h3 className="mt-2 text-xl font-bold">{article.title}</h3>
            <p className="mt-2 text-muted-foreground line-clamp-3">{article.summary}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center space-x-2">
          {session && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className={feedback === "up" ? "text-green-500" : ""}
                onClick={() => handleFeedback("up")}
              >
                <ThumbsUpIcon className="h-4 w-4 mr-1" />
                Helpful
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={feedback === "down" ? "text-red-500" : ""}
                onClick={() => handleFeedback("down")}
              >
                <ThumbsDownIcon className="h-4 w-4 mr-1" />
                Not helpful
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleFavorite} className={isFavorite ? "text-yellow-500" : ""}>
            <BookmarkIcon className="h-4 w-4 mr-1" />
            {isFavorite ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="h-4 w-4 mr-1" />
              Read
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

