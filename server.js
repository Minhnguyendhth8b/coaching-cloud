import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import configs from './config';
import routes from './routes';
import middlewaresConfig from './configs/middleware';

// Connect to database using mongodb
mongoose.connect(configs.connections.mongodb.url, (err) => {
    if (err) {
        console.log(chalk.red('Database connection error: ' + err));
    } else {
        console.log(chalk.green('Connect to database successfully'));
    }
})

const app = express();

middlewaresConfig(app);

app.use('/api', routes);

app.listen(configs.port, (err) => {
    if (err) {
        console.log(chalk.red('Error when connect to server: ' + err));
    } else {
        console.log(chalk.green('Server is run on port: ' + configs.port));
    }
})