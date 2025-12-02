import { apiClient } from "@/app/shared/api/api";

export default async function getCategories() {
  try {
    const categories = await apiClient.get("/category");
    return { categories, status: "success" };
  } catch (error) {
    return { categories: [], status: "error" };
  }
}
