import * as express from 'express';
import axios from 'axios';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import Member from '../models/members';
import FormData from 'form-data';

//@route    GET api/member
//@desc     Makes a request to github for getting member details
//@acess    Public
router.get('/', async (_: express.Request, res: express.Response) => {
    try {
        const members = await Member.find({});
        return res.json(members);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

//@route    POST api/member/get-token
//@desc     Makes a request to github using code obtained from frontend
//          for getting member acess token and then getting profile
//@acess    Public
router.post(
    '/get-token',
    [check('code', 'Code is Required').not().isEmpty()],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //Return bad request error if error occours
        }
        const { code } = req.body;
        /// <reference path="types/index.d.ts"/>
        const data: FormData = new FormData();
        data.append('client_id', process.env.GITHUB_CLIENT_ID!);
        data.append('client_secret', process.env.GITHUB_CLIENT_SECRET!);
        data.append('code', code);
        data.append('redirect_uri', process.env.GITHUB_REDIRECT_URI!);
        try {
            const resp = await axios.post(`https://github.com/login/oauth/access_token`, data, {
                headers: data.getHeaders(),
            });
            const strParams = resp.data;
            const params = new URLSearchParams(strParams);
            const AcessToken = params.get('access_token');
            if (AcessToken) {
                const profile = await axios.get('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${AcessToken}`,
                    },
                });
                return res.status(200).json(profile.data);
            }
            return res.status(401).json({ errors: [{ msg: 'Invalid code fetched' }] });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ msg: 'Some Error Occoured' }] });
        }
    },
);

router.post('send-invite', [check('userName').not().isEmpty()], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //Return bad request error if error occours
    }
    const { userName } = req.body;
});

export default router;
