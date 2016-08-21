import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await

const router = new Express.Router();

router.get('/:generatedLink', wrap(async function (req, res, next) {
    return req.storage.getLink(req.params.generatedLink).then(link => {
        if (link) {
            res.redirect(link);
        } else {
            next();
        }
    });
}));

export default router;
