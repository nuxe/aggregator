import { Suspense } from "react"
import { MainFeed } from "@/components/main-feed"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FeedSkeleton } from "@/components/skeletons/feed-skeleton"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar className="w-full md:w-64 md:min-w-64" />
        <main className="flex-1 border-l">
          <div className="container mx-auto py-4 px-4 md:px-8">
            <Suspense fallback={<FeedSkeleton />}>
              <MainFeed />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

