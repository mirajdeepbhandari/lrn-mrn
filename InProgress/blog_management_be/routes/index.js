const router = require('express').Router(); 

router.get('/', (req, res, next) => {
    try {
        res.json({data: null, msg: 'API is working'});
     } 
    catch (e) {
        next(e);
    }
});

router.use('/users', require('../modules/users/user.route'));
router.use('/blogs', require('../modules/blogs/blog.route'));
router.use('/bookmarks', require('../modules/bookmarks/bookmark.route'));


module.exports = router;
