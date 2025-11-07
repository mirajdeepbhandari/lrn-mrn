import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../utils/axios";
import { URLS } from "../constants/index";
import { getItem } from "../utils/session";

const initialState = {
  blogs: [],
  blog: {},
  total: 0,
  currentPage: 1,
  limit: 8,
  error: "",
  loading: true,
  search: "",
  filter: "all",
  success:"",
};

// List all blogs
export const ListAllBlogs = createAsyncThunk(
  "blogs/listblogs",
  async ({ page, limit, search, filter }) => {
    const response = await instance.get(
      `${URLS.GET_PUBLISHED_BLOGS}?page=${page}&limit=${limit}&status=${filter}&title=${search}`,
      {
        headers: {
          access_token: getItem(),
        },
      }
    );
    return response.data;
  }
);

// 🧩 Get a single blog by slug
export const getBlogBySlug = createAsyncThunk(
  "blogs/getBlogBySlug",
  async ({slug}) => {
    const response = await instance.get(
      `${URLS.GET_SINGLE_BLOG.replace(":slug", slug)}`,
      {
        headers: {
          access_token: getItem(),
        },
      }
    );
    console.log(response.data?.data)
    return response.data?.data;
  }
);

// 🧩 Update blog by slug
export const updateBlogBySlug = createAsyncThunk(
  "blogs/updateBlogBySlug",
  async ({ slug, blogData }) => {
    const response = await instance.put(
      `${URLS.GET_SINGLE_BLOG.replace(":slug", slug)}`,
      blogData,
      {
        headers: {
          access_token: getItem(),
        },
      }
    );

    return response.data;
  }
);

// 🧩 Update status by slug
export const updateStatusBySlug = createAsyncThunk(
  "blogs/updateStatusBySlug",
  async ({ slug, status }) => {
      console.log("Publishing blog with slug in slice:", slug);
    const response = await instance.patch(
      `${URLS.GET_SINGLE_BLOG.replace(":slug", slug)}`,
      { status },
      {
        headers: {
          access_token: getItem(),
        },
      }
    );
    return response.data;
  }
);

// 🧩 Delete blog by slug
export const deleteBlogBySlug = createAsyncThunk(
  "blogs/deleteBlogBySlug",
  async (slug) => {
    const response = await instance.delete(
      `${URLS.GET_SINGLE_BLOG.replace(":slug", slug)}`,
      {
        headers: {
          access_token: getItem(),
        },
      }
    );
    response.data.slug = slug;
    return response.data;
  }
);

// 🧩 Slice
export const blogSliceAdmin = createSlice({
  name: "blogAdmin",
  initialState,
  reducers: { // frontend side changes
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
  extraReducers: (builder) => { // for backend side changes
    builder
      .addCase(ListAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(ListAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data.data;
        state.total = action.payload.data.total;
      })
      .addCase(ListAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBlogBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlogBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(updateBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStatusBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.success= action.payload.msg;
        state.blogs = state.blogs.map((blog) =>
          blog.slug === action.payload.data.slug ? { ...blog, status: "published" } : blog
        );
      })
      .addCase(updateStatusBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlogBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(
          (blog) => blog.slug !== action.payload.slug
        );
        state.success = action.payload.msg;
      })
      .addCase(deleteBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSearch, setFilter,setSuccess } = blogSliceAdmin.actions;
export default blogSliceAdmin.reducer;
