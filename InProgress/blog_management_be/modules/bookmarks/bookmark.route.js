const router = require('express').Router();
const { secureAPI } = require('../../utils/secure');
const bookmarkController = require('./bookmark.controller');

router.get('/', secureAPI(['user', 'admin']),  async (req, res, next) => {
    try {
        const {page, limit} = req.query;
        const owner = req.currentUser;
        const result = await bookmarkController.list({owner, page, limit});
    owner: req.currentUser,
    page,
    limit,
        res.json({ data: result, msg: 'Bookmark list  successfully' });
} catch (e) {
        next(e);
    }
 });  

 router.post('/', secureAPI(['user', 'admin']),  async (req, res, next) => {
    try {
    const{blogId}=req.body;
    if(!blogId){
        throw new Error('Blog ID is missing');
    }
        const result = await bookmarkController.create(blogId,req.body.currentUser);
        res.json({ data: result, msg: 'Bookmark added  successfully' });
} catch (e) {
        next(e);
    }
 });  


 router.delete('/:id', secureAPI(['user', 'admin']),async(req, res, next) => {
    try {
        await bookmarkController.removeBookmark(req.params.id, req.currentUser);
        res.json({ data: null, msg: 'Bookmark remove successfully' });
    } catch (e) {
        next(e);
    }
 });  

 module.exports = router;