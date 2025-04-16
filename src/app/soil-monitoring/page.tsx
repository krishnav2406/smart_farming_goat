"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookmarkIcon,
  MagnifyingGlassIcon as SearchIcon,
  ExternalLinkIcon,
  BookmarkFilledIcon
} from "@radix-ui/react-icons";

// Define the article interface
interface Article {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source?: {
    name: string;
  };
}

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFarmerNews, setShowFarmerNews] = useState(false);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  // API key for NewsAPI
  const apiKey = "e74921f097d244d5a41fb6b619e81252";

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Fetch farming related news
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=farming+OR+agriculture+OR+crops+OR+farm&apiKey=${apiKey}&pageSize=20&language=en`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    // Load saved articles from localStorage
    const loadSavedArticles = () => {
      const saved = localStorage.getItem("savedFarmingArticles");
      if (saved) {
        setSavedArticles(JSON.parse(saved));
      }
    };

    fetchNews();
    loadSavedArticles();
  }, []);

  // Filter articles based on search term and farmer filter
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!showFarmerNews) return matchesSearch;
    
    // Check if article contains farmer-related keywords
    const farmerKeywords = ["farmer", "farmers", "farm owner", "agriculture worker", "rural"];
    const containsFarmerKeywords = farmerKeywords.some(keyword => 
      article.title.toLowerCase().includes(keyword.toLowerCase()) || 
      (article.description && article.description.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    return matchesSearch && containsFarmerKeywords;
  });

  // Toggle save article
  const toggleSaveArticle = (article: Article) => {
    const isAlreadySaved = savedArticles.some(saved => saved.url === article.url);
    let updatedSaved;
    
    if (isAlreadySaved) {
      updatedSaved = savedArticles.filter(saved => saved.url !== article.url);
    } else {
      updatedSaved = [...savedArticles, article];
    }
    
    setSavedArticles(updatedSaved);
    localStorage.setItem("savedFarmingArticles", JSON.stringify(updatedSaved));
  };

  // Check if an article is saved
  const isArticleSaved = (article: Article) => {
    return savedArticles.some(saved => saved.url === article.url);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Live Farming News</h1>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search news..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant={showFarmerNews ? "default" : "outline"}
              onClick={() => setShowFarmerNews(!showFarmerNews)}
            >
              {showFarmerNews ? "All News" : "Farmer News"}
            </Button>
          </div>

          {/* Saved articles section */}
          {savedArticles.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Saved Articles</h2>
              <div className="grid grid-cols-1 gap-4">
                {savedArticles.map((article, index) => (
                  <div key={`saved-${index}`} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        {article.title}
                      </a>
                      <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleSaveArticle(article)}
                    >
                      <BookmarkFilledIcon className="h-5 w-5 text-primary" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* News articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <Card className="p-6 h-64 animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </Card>
                <Card className="p-6 h-64 animate-pulse md:block hidden">
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </Card>
                <Card className="p-6 h-64 animate-pulse lg:block hidden">
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </Card>
              </>
            ) : error ? (
              <Card className="p-6 col-span-full">
                <p className="text-red-500">Error loading news: {error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </Card>
            ) : filteredArticles.length === 0 ? (
              <Card className="p-6 col-span-full">
                <p className="text-center">No articles found matching your search criteria.</p>
              </Card>
            ) : (
              filteredArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden flex flex-col h-full">
                  {article.urlToImage ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const imgElement = e.target as HTMLImageElement;
                          imgElement.onerror = null;
                          imgElement.src = "/images/placeholder-news.jpg";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-400">No image available</p>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {article.source?.name || "News"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSaveArticle(article)}
                      >
                        {isArticleSaved(article) ? (
                          <BookmarkFilledIcon className="h-5 w-5 text-primary" />
                        ) : (
                          <BookmarkIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {article.description || "No description available."}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500">
                        {formatDate(article.publishedAt)}
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline text-sm"
                      >
                        Read More
                        <ExternalLinkIcon className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
