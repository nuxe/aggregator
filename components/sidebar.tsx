"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookmarkIcon, FilterIcon, HomeIcon, SearchIcon, TrendingUpIcon, XIcon } from "lucide-react"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [blockedKeywords, setBlockedKeywords] = useState<string[]>(["crypto", "NFT"])
  const [newKeyword, setNewKeyword] = useState("")

  const addBlockedKeyword = () => {
    if (newKeyword && !blockedKeywords.includes(newKeyword)) {
      setBlockedKeywords([...blockedKeywords, newKeyword])
      setNewKeyword("")
    }
  }

  const removeBlockedKeyword = (keyword: string) => {
    setBlockedKeywords(blockedKeywords.filter((k) => k !== keyword))
  }

  return (
    <div className={cn("flex h-screen flex-col border-r p-4 md:h-auto", className)}>
      <div className="space-y-4">
        <div className="flex items-center rounded-lg border px-3 py-1">
          <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            className="flex h-8 w-full rounded-md border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/?sort=trending">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <TrendingUpIcon className="mr-2 h-4 w-4" />
              Trending
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <BookmarkIcon className="mr-2 h-4 w-4" />
              Favorites
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Topics</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">
              AI
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Machine Learning
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Startups
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Robotics
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              LLMs
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Sources</h3>
          <div className="space-y-1">
            <div className="flex items-center">
              <input type="checkbox" id="source-techcrunch" className="mr-2" defaultChecked />
              <Label htmlFor="source-techcrunch" className="text-sm">
                TechCrunch
              </Label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="source-hackernews" className="mr-2" defaultChecked />
              <Label htmlFor="source-hackernews" className="text-sm">
                Hacker News
              </Label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="source-arxiv" className="mr-2" defaultChecked />
              <Label htmlFor="source-arxiv" className="text-sm">
                ArXiv
              </Label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="source-mittr" className="mr-2" defaultChecked />
              <Label htmlFor="source-mittr" className="text-sm">
                MIT Tech Review
              </Label>
            </div>
          </div>
        </div>

        {session && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center">
                <FilterIcon className="mr-2 h-4 w-4" />
                <h3 className="text-sm font-medium">Blocked Keywords</h3>
              </div>
              <div className="flex">
                <Input
                  className="h-8 mr-2"
                  placeholder="Add keyword..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addBlockedKeyword()
                    }
                  }}
                />
                <Button variant="outline" size="sm" onClick={addBlockedKeyword}>
                  Add
                </Button>
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
          </>
        )}
      </div>
    </div>
  )
}

