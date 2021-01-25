import express from 'express';
import connectDb from './db/connect';
import CoderRoutes from './routes/coders';
import MemberRoutes from './routes/members';
import cors from 'cors';
const main = async () => {
    const app = express();
    const port = process.env.PORT || '4000';
    connectDb();
    app.use(cors());
    // @ts-ignore
    app.use(express.json({ extended: false }));

    //  Welcome Message
    app.get('/', (_, res) => {
        //console.log(req);

        return res.send('API Running');
    });
    app.get('/redirect', (_, res) => {
        return res.redirect(
            `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`,
        );
    });

    //  Define Routes
    app.use('/api/coders', CoderRoutes);
    app.use('/api/members', MemberRoutes);
    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}`);
    });
};

main();
