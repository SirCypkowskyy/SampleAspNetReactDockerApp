import {fileURLToPath, URL} from 'node:url';

import {defineConfig, ProxyOptions} from 'vite';
import plugin from '@vitejs/plugin-react';

// import fs from 'fs';
// import path from 'path';
// import child_process from 'child_process';

// const baseFolder =
//     process.env.APPDATA !== undefined && process.env.APPDATA !== ''
//         ? `${process.env.APPDATA}/ASP.NET/https`
//         : `${process.env.HOME}/.aspnet/https`;
//
// const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
// const certificateName = certificateArg && certificateArg.groups ? certificateArg.groups.value : "sampleaspnetreactdockerapp.client";
//
// if (!certificateName) {
//     console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
//     process.exit(-1);
// }
//
// const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
// const keyFilePath = path.join(baseFolder, `${certificateName}.key`);
//
// if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
//     if (0 !== child_process.spawnSync('dotnet', [
//         'dev-certs',
//         'https',
//         '--export-path',
//         certFilePath,
//         '--format',
//         'Pem',
//         '--no-password',
//     ], { stdio: 'inherit', }).status) {
//         throw new Error("Could not create certificate.");
//     }
// }

const possibleBackendUrls: string[] = process.env.ASPNETCORE_URLS ?
    process.env.ASPNETCORE_URLS.split(',') :
    ["http://localhost:5136"];

const aspNetCore_environment: string = process.env.ASPNETCORE_ENVIRONMENT || "Development";

// The application was designed so that the swagger UI is only shown in development mode or when the ASPNETCORE_SHOW_SWAGGER_IN_PRODUCTION environment variable is set to true.
const aspNetCore_shouldShowSwaggerInProduction: boolean = process.env.ASPNETCORE_SHOW_SWAGGER_IN_PRODUCTION === "true";

const backendUrl: string = possibleBackendUrls[0];

let serverProxies : Record<string, ProxyOptions> = {
    "/api": {
        target: backendUrl,
    },
};

if (aspNetCore_environment === "Development" || aspNetCore_shouldShowSwaggerInProduction) {
    serverProxies = {
        ...serverProxies,
        "/swagger": {
            target: backendUrl,
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: serverProxies,
        port: 5173,
        // https: {
        //     key: fs.readFileSync(keyFilePath),
        //     cert: fs.readFileSync(certFilePath),
        // }
    }
})
