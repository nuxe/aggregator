import type { Article } from "@/types/article"

// This is a mock implementation for the MVP
// In a real app, this would call your serverless functions
export async function fetchArticles(page = 1, sort: "relevance" | "date" = "relevance"): Promise<Article[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const mockArticles: Article[] = [
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
      id: "2",
      title: "Google's DeepMind Achieves Breakthrough in Protein Folding",
      url: "https://example.com/deepmind-protein",
      summary:
        "Google's DeepMind has announced a significant breakthrough in protein folding prediction, potentially revolutionizing drug discovery and biological research.",
      source: "MIT Tech Review",
      imageUrl: "/placeholder.svg?height=300&width=400",
      publishedAt: "2025-03-06T09:15:00Z",
      topics: ["AI", "DeepMind", "Biology"],
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
    {
      id: "4",
      title: "New Research Shows Promise for Quantum Machine Learning",
      url: "https://example.com/quantum-ml",
      summary:
        "Researchers have demonstrated a new approach to quantum machine learning that could exponentially speed up certain AI algorithms.",
      source: "ArXiv",
      publishedAt: "2025-03-04T11:20:00Z",
      topics: ["Quantum Computing", "Machine Learning", "Research"],
    },
    {
      id: "5",
      title: "AI Startup Raises $100M to Develop Autonomous Coding Assistant",
      url: "https://example.com/ai-coding-assistant",
      summary:
        "A new AI startup has secured $100 million in funding to develop an advanced autonomous coding assistant that can generate and review code.",
      source: "TechCrunch",
      imageUrl: "/placeholder.svg?height=300&width=400",
      publishedAt: "2025-03-03T08:00:00Z",
      topics: ["AI", "Startups", "Coding"],
    },
  ]

  // Generate more mock articles for pagination
  const pageSize = 5
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  // For demo purposes, we'll generate articles based on the page number
  const pageArticles = mockArticles.map((article) => ({
    ...article,
    id: `${article.id}-${page}`,
    title: `${article.title} (Page ${page})`,
  }))

  // Sort articles based on the sort parameter
  if (sort === "date") {
    pageArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  return pageArticles
}

