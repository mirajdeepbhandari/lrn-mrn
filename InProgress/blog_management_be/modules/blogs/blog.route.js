const router = require("express").Router();
const {secureAPI} = require('../../utils/secure');
const blogController = require("./blog.controller");
const {upload, storage} = require('../../utils/multer');
const { blogPostingValidation} = require('./blog.validation');

const blogUpload = upload(storage("public/blogs"));

router.get("/", async (req, res, next) => {
    try {
        const { title, status, page, limit } = req.query;
        const search = { title, status };
        const result = await blogController.list({search, page, limit});
        res.json({ data: result, msg: "Blog list generated successfully" });
    } catch (e) {
        next(e);
    }
});

router.post("/create",  blogUpload.single('image'), secureAPI(["admin", "user"]), blogPostingValidation, async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = req.file.path.replace("public", "");
        }
        const blog = await blogController.create(req.body);
        res.json({ data: blog, msg: "Blog created successfully" });
    } catch (e) {
        next(e);
    }
});

// afu ley post gareko aauni ho yo
router.get("/my-blogs", secureAPI(['admin']), async (req, res, next) => {
    try {
        const {title, status, page, limit} = req.query;
        const search = {title, status};
        const result = await blogController.getAllMyBlogs({ search, page, limit, currentUser: req.currentUser });
        res.json({ data: result, msg: "My blogs retrieved successfully" });
    } catch (e) {
        next(e);
    }
});

router.get("/published-blogs", async (req, res, next) => {
    try {
        const { title, page, limit, sort, status } = req.query; 
        const search = { title };
        const result = await blogController.getAllPublishedBlogs({ search, page, limit, sort, status });
        res.json({ data: result, msg: "Blog list generated successfully" });
    } catch (e) {
        next(e);
    }
});


router.get("/:slug", async (req, res, next) => {
    try {
        console.log("Fetching blog with slug:", req.params.slug);
        const blog = await blogController.getBySlug(req.params.slug);
        res.json({ data: blog, msg: "Blog retrieved successfully" });
    } catch (e) {
        next(e);
    }
});

router.put(
    "/:slug",
    secureAPI(["admin", "user"]),
    blogUpload.single("image"),
    async (req, res, next) => {
        try {
            if (req.file) {
                req.body.image = req.file.path.replace("public", "");
            }

            req.body.currentUser = req?.currentUser;

            const result = await blogController.updateBySlug(
                req.params.slug,
                req.body
            );

            res.json({
                data: result,
                msg: "Blog updated successfully",
            });
        } catch (e) {
            next(e);
        }
    }
);

router.patch("/:slug", secureAPI(["admin", "user"]), async (req, res, next) => {
    try {
        const result = await blogController.updateStatusBySlug(req.params.slug);
        res.json({
            data: result,
            msg: "Blog status updated successfully",
        });
    } catch (e) {
        next(e);
    }
});

router.delete(
    "/:slug",
    secureAPI(["admin", "user"]),
    async (req, res, next) => {
        try {
            const owner = req?.currentUser;
            const result = await blogController.removeBySlug(req.params.slug, owner);
            res.json({
                data: result,
                msg: "Blog deleted successfully",
            });
        } catch (e) {
            next(e);
        }
    }
);




module.exports = router;