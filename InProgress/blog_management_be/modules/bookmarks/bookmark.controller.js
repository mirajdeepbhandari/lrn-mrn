const bookmarkModel = require('./bookmark.model');
const { ObjectId } = require('mongoose').Types;

const create = async (blogId, userId) => {
    // Check if the bookmark already exists
    const existing = await bookmarkModel.findOne({ blog: blogId, user: userId });

    if (existing) {
        throw new Error('Bookmark already exists');
    }

    // Create and return new bookmark
    const newBookmark = await bookmarkModel.create({ blog: blogId, user: userId });
    return newBookmark;
};

const list= async ({owner,page=1,limit=10})=>{
      
    console.log("whose bookmarks:",owner);
      const query = [];
        query.push({
            $match: {
                user: new ObjectId(owner)
            }
        });
    
        // Aggregation with facet for pagination + metadata
        query.push({
            $facet: {
                metadata: [{ $count: "total" }],
                data: [
                    { $skip: (+page - 1) * +limit },
                    { $limit: +limit },
                    
                    {
                        $lookup: {
                            from: "blogs",
                            localField: "blog",
                            foreignField: "_id",
                            as: "blog",
                        }
                        },
                        {
                        $unwind: {
                            path: "$blog",
                            preserveNullAndEmptyArrays: false,
                        }
                        },
                ],
            },
        },
        {
            $addFields: {
                total: { $arrayElemAt: ["$metadata.total", 0] },
            },
        });
    
        const result = await bookmarkModel.aggregate(query);
    
        return {
            total: result[0]?.total || 0,
            data: result[0]?.data || [],
            page: +page,
            limit: +limit,
        };
}




const removeBookmark = async (bookmarkId, user_id) => {

    const delete_info = await bookmarkModel.deleteOne({ _id: bookmarkId , user: user_id });

    if (delete_info.deletedCount === 0) {
        throw new Error('you are unable to remove this bookmark');
    }

    return { msg: 'Bookmark deleted successfully' };
};

module.exports = {
    create,
    list,
    removeBookmark
}   