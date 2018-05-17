import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';

const app = (app) => {
    app.use(bodyParser.json()); // Using JSON
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    if (!isTest && isDev) {
        app.use(morgan('dev'));
    }
}

export default app;