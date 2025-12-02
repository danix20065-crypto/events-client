"use client";

import {
  Stack,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { pagination } from "../features/pagination";
import { FormControlSelect } from "./FormControlSelect";
import { LIMIT_OPTIONS } from "@/app/constants/filters/limit.options";
import { SORT_BY_OPTIONS } from "@/app/constants/filters/sort-by.options";
import { ORDER_BY_OPTIONS } from "@/app/constants/filters/order-by.options";

interface EventsFiltersProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  search: string;
  sortBy?: string;
  sortOrder?: string;
}

export default function EventsFilters({
  currentPage,
  totalPages,
  limit,
  search,
  sortBy,
  sortOrder,
}: EventsFiltersProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(search);
  const [selectedLimit, setSelectedLimit] = useState(limit);
  const [selectedSortBy, setSelectedSortBy] = useState<string>(
    sortBy || "created_at"
  );
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>(
    sortOrder || "desc"
  );

  const updateFilters = useCallback(
    (
      newSearch?: string,
      newLimit?: number,
      newSortBy?: string,
      newSortOrder?: string
    ) => {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", String(newLimit ?? selectedLimit));
      const finalSearch = newSearch !== undefined ? newSearch : searchQuery;
      if (finalSearch && finalSearch.trim()) params.set("search", finalSearch);

      const finalSortBy = newSortBy ?? selectedSortBy;
      const finalSortOrder = newSortOrder ?? selectedSortOrder;
      if (finalSortBy) params.set("sortBy", finalSortBy);
      if (finalSortOrder) params.set("sortOrder", finalSortOrder);

      router.push(`/events?${params.toString()}`);
    },
    [router, selectedLimit, searchQuery, selectedSortBy, selectedSortOrder]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(searchQuery);
  };

  const handleLimitChange = (value: number) => {
    setSelectedLimit(value);
    updateFilters(undefined, value);
  };

  const handleSortByChange = (value: string) => {
    setSelectedSortBy(value);
    updateFilters(undefined, undefined, value, undefined);
  };

  const handleSortOrderChange = (value: string) => {
    setSelectedSortOrder(value);
    updateFilters(undefined, undefined, undefined, value);
  };

  return (
    <>
      <Box
        sx={{
          background: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          mb: 4,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ gap: 2 }}
        >
          <form onSubmit={handleSearchSubmit} style={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="🔍 Search events by title..."
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#f5f7fa",
                  "&:hover": {
                    background: "#f0f2f5",
                  },
                  "&.Mui-focused": {
                    background: "#fff",
                    "& fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                },
              }}
            />
          </form>

          <FormControlSelect
            selectedValue={selectedLimit}
            label="Items per page"
            onValueChange={handleLimitChange}
            options={LIMIT_OPTIONS}
          />

          <FormControlSelect
            selectedValue={selectedSortBy}
            onValueChange={handleSortByChange}
            options={SORT_BY_OPTIONS}
          />

          <FormControlSelect
            selectedValue={selectedSortOrder}
            onValueChange={handleSortOrderChange}
            options={ORDER_BY_OPTIONS}
          />

          <Link href="/events/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "0.95rem",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              + Create Event
            </Button>
          </Link>
        </Stack>
      </Box>

      <Stack sx={{ display: "flex", alignItems: "center", mt: 4, mb: 4 }}>
        <Pagination
          count={Math.max(totalPages, 1)}
          page={currentPage}
          onChange={(event, newPage) => {
            pagination({
              newPage,
              selectedLimit,
              searchQuery,
              selectedSortBy,
              selectedSortOrder,
            });
          }}
          color="primary"
          size="large"
          variant="outlined"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              borderColor: "#ddd",
              "&.Mui-selected": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderColor: "transparent",
                color: "#fff",
              },
            },
          }}
        />
      </Stack>
    </>
  );
}
