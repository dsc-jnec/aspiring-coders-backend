import * as express from 'express';
const router = express.Router();
const { check, validationResult } = require('express-validator');

import Coder from '../models/coders';

//@route    GET api/coders
//@desc     Gets List of Registered Coders
//@acess    Public
router.get('/', async (req: express.Request, res: express.Response) => {
    console.log(req);

    try {
        const coders = await Coder.find({});
        return res.json(coders);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

//@route    post api/coders/register
//@desc     Register Coder
//@acess    Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('codechefId', 'Codechef Id is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        console.log(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //Return bad request error if error occours
        }
        const { name, email, codechefId } = req.body;
        try {
            let coder = await Coder.findOne({ email });
            if (coder) {
                return res.status(400).json({ errors: [{ msg: 'Coder already exists' }] });
            }
            coder = new Coder({
                name,
                email,
                codechefId,
            });
            await coder.save();
            return res.send('User registered');
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: errors.array() });
        }
    },
);
export default router;
