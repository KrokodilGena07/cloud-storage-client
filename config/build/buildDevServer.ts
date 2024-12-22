import {BuildOptions} from './types';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer({port}: BuildOptions): DevServerConfiguration {
    return {
        port,
        historyApiFallback: true,
        hot: true
    };
}