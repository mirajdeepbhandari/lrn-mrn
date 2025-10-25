const blogModel = require("./blog.model");
const userModel = require("../users/users.model");
const { slugifyIT } = require("../../utils/string");
const { ObjectId } = require('mongoose').Types;
const create = async(payload) => {
    const {title, currentUser, ...rest} = payload;
    const slug = slugifyIT(title);
    const blog = await blogModel.create({title, slug, author: currentUser, ...rest});
    if (!blog) throw {status: 400, message: "Blog creation failed! Please try again."};
    return blog;
};


const list = async ({ search, page = 1, limit = 10 }) => {
    const query = [];

    // Search by title
    if (search?.title) {
        query.push({
            $match: {
                title: { $regex: search.title, $options: "i" },
            },
        });
    }

    // Filter by status
    if (search?.status) {
        query.push({
            $match: {
                status: search.status,
            },
        });
    }

    // Aggregation with facet for pagination + metadata
    query.push({
        $facet: {
            metadata: [{ $count: "total" }],
            data: [
                { $skip: (+page - 1) * +limit },
                { $limit: +limit },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: {
                        path: "$author",
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $project: {
                        "author.name": 1,
                        "author.email": 1,
                        "author.bio": 1,
                        title: 1,
                        content: 1,
                        status: 1,
                        slug: 1,
                        image: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ],
        },
    },
    {
        $addFields: {
            total: { $arrayElemAt: ["$metadata.total", 0] },
        },
    });

    const result = await blogModel.aggregate(query);

    return {
        total: result[0]?.total || 0,
        data: result[0]?.data || [],
        page: +page,
        limit: +limit,
    };
};


const getBySlug = (slug) => {
    return blogModel.findOne({ slug , status: "published"}).populate('author' , 'name email bio image');
};

const getAllMyBlogs = async ({ search, page = 1, limit = 10 , currentUser}) => {
    const query = [];
    query.push({
        $match: {
            author: new ObjectId(currentUser)
        }
    });

    // Search by title
    if (search?.title) {
        query.push({
            $match: {
                title: { $regex: search.title, $options: "i" },
            },
        });
    }

    // Filter by status
    if (search?.status) {
        query.push({
            $match: {
                status: search.status,
            },
        });
    }

    // Aggregation with facet for pagination + metadata
    query.push({
        $facet: {
            metadata: [{ $count: "total" }],
            data: [
                { $skip: (+page - 1) * +limit },
                { $limit: +limit },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: {
                        path: "$author",
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $project: {
                        "author.name": 1,
                        "author.email": 1,
                        "author.bio": 1,
                        title: 1,
                        content: 1,
                        status: 1,
                        slug: 1,
                        image: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ],
        },
    },
    {
        $addFields: {
            total: { $arrayElemAt: ["$metadata.total", 0] },
        },
    });

    const result = await blogModel.aggregate(query);

    return {
        total: result[0]?.total || 0,
        data: result[0]?.data || [],
        page: +page,
        limit: +limit,
    };
};


const updateStatusBySlug = async (slug) => {
    const existingBlog = await blogModel.findOne({ slug });

    if (!existingBlog) throw new Error("Blog not found");

    const newStatus = existingBlog.status === "draft" ? "published" : "draft";

    return blogModel.findOneAndUpdate({ slug }, { status: newStatus });
};

const updateBySlug = async (slug, payload) => {
    const { title, ...rest } = payload;
    const existingBlog = await blogModel.findOne({ slug });

    if (!existingBlog) throw new Error("Blog not found");

    if (existingBlog.title !== title) { // Assuming the intent is NOT equal
        const newSlug = slugifyIT(title);
        rest.slug = newSlug;
    }
    return blogModel.findOneAndUpdate({ slug }, rest, { new: true });
};

const removeBySlug = async (slug, owner) => {
    const blog = await blogModel.findOne({ slug });

    if (!blog) throw new Error("Blog not found");

    const user = await userModel.findOne({ _id: owner }); // This line is present but 'user' is unused later
    console.log(user.roles.includes("admin"));
    if (blog.author !== owner && !user.roles.includes("admin")) { 
        throw new Error("User unauthorized to delete this blog");
    }

    return blogModel.deleteOne({ slug });
};

const getAllPublishedBlogs = async ({search, page = 1, limit = 10, sort = "latest"}) => {
    console.log(`title: ${search?.title}, page: ${page}, limit: ${limit}`);
     const query = [
        {
            $match: {
                status: "published",
            },
        }
     ];

    // Search by title
    if (search?.title) {
        query.push({
            $match: {
                title: { $regex: search.title, $options: "i" },
            },
        });
    }

    // Sorting
    const sortStage = {
        $sort: {
            createdAt: sort === "oldest" ? 1 : -1, // 1 = oldest first, -1 = latest first
        },
    };

    // Aggregation with facet for pagination + metadata
    query.push({
        $facet: {
            metadata: [{ $count: "total" }],
            data: [
                sortStage,
                { $skip: (+page - 1) * +limit },
                { $limit: +limit },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: {
                        path: "$author",
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $project: {
                        "author.name": 1,
                        "author.email": 1,
                        "author.bio": 1,
                        "author.image": 1,
                        title: 1,
                        content: 1,
                        status: 1,
                        slug: 1,
                        image: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ],
        },
    },
    {
        $addFields: {
            total: { $arrayElemAt: ["$metadata.total", 0] },
        },
    });

    const result = await blogModel.aggregate(query);

    return {
        total: result[0]?.total || 0,
        data: result[0]?.data || [],
        page: +page,
        limit: +limit,
    };
};

module.exports = {list, getBySlug, create, updateBySlug, removeBySlug, updateStatusBySlug, getAllMyBlogs, getAllPublishedBlogs};