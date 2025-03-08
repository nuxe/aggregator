"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import type { Article } from "@/types/article"
import { fetchArticles } from "@/lib/api"

export function MainFeed() {
  const { data: session } = useSession()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activeTab, setActiveTab] = useState("top")
  const { ref, inView } = useInView()

  const loadArticles = async (reset = false) => {
    if (!hasMore && !reset) return

    setLoading(true)
    try {
      const newPage = reset ? 1 : page
      const sort = activeTab === "top" ? "relevance" : "date"
      const newArticles = await fetchArticles(newPage, sort)

      if (reset) {
        setArticles(newArticles)
      } else {
        setArticles((prev) => [...prev, ...newArticles])
      }

      setHasMore(newArticles.length > 0)
      if (!reset) setPage(page + 1)
    } catch (error) {
      console.error("Error loading articles:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles(true)
  }, [activeTab])

  useEffect(() => {
    if (inView && !loading) {
      loadArticles()
    }
  }, [inView])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="top" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="top">Top Stories</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={() => loadArticles(true)}>
            Refresh
          </Button>
        </div>
        <TabsContent value="top" className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </TabsContent>
        <TabsContent value="latest" className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </TabsContent>
      </Tabs>

      {loading && <div className="py-4 text-center">Loading more articles...</div>}

      <div ref={ref} className="h-10" />
    </div>
  )
}

