import express from 'express';
import connectDb from './db/connect';
import CoderRoutes from './routes/coders';
import cors from 'cors';
const main = async () => {
    const app = express();
    const port = process.env.PORT || '4000';
    connectDb();
    app.use(cors());
    // @ts-ignore
    app.use(express.json({ extended: false }));

    //  Welcome Message
    app.get('/', (req, res) => {
        console.log(req);

        return res.send('API Running');
    });

    //  Define Routes
    app.use('/api/coders', CoderRoutes);
    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}`);
    });
};

main();
