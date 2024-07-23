import { resolve as _resolve } from 'path';
import Dotenv from 'dotenv-webpack';

export const entry = './ImageAi.js';
export const output = {
    filename: 'bundle.js',
    path: _resolve(__dirname, 'dist'),
};
export const mode = 'development';
export const resolve = {
    extensions: ['.js'],
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
    ],
};
export const plugins = [
    new Dotenv({
        path: './.env', // Path to your .env file
    }),
];
