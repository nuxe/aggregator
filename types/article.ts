export interface Article {
  id: string
  title: string
  url: string
  summary: string
  content?: string
  source: string
  imageUrl?: string
  publishedAt: string
  topics?: string[]
}

