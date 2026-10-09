
import { NEWS_API_BASE_URL, NEWS_API_KEY } from "../config/api";
import { NewsAPIResponse } from "../types/news";

export interface FetchNewsParams {
    page?: number;
    pageSize?: number;
    category?: string;
    country?: string;
    query?: string;
}

export const fetchTopHeadlines = async (
    params: FetchNewsParams
): Promise<NewsAPIResponse> => {
    const {
        page = 1,
        pageSize = 20,
        category = "general",
        country = "in",
        query,
    } = params;

    if (!NEWS_API_KEY) {
        throw new Error("NEWS_API_KEY is not defined");
    }

    const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        country,
        ...(category && category !== "all" ? { category } : {}),
        ...(query ? { q: query } : {}),
    });

    const url = `${NEWS_API_BASE_URL}/top-headlines?${queryParams.toString()}`;
    try {

        const response = await fetch(url, {
            headers: { "X-Api-Key": NEWS_API_KEY },
        });
        if (!response.ok) {
            throw new Error(`NewsAPI request failed with status ${response.status}`);
        }
        const data: NewsAPIResponse = await response.json();
        return data;
    } catch (error) {
        console.log("Failed to fetch news:", error);
        throw new Error(`Failed to fetch news: ${error}`);
    }
}
