import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../web/.env'),
});

// master-staging only: Plenty test-drive (do not merge to main)
process.env.API_ENDPOINT = 'https://162667ef47.plenty-test-drive.eu';
process.env.API_SECURITY_TOKEN = 'MTYyNjZfS004aDV2blVpSjVIOWpsaVlHcTBpUkpMVThXZUJCY2JlZHhIbHZxQzlYTDI4bExpem4=';
process.env.CONFIG_ID = '1';
process.env.FETCH_REMOTE_CONFIG = '0';

const config = {
  logger: {
    verbosity: process.env.LOG_LEVEL ?? 'info',
  },
  integrations: {
    plentysystems: {
      location: '@plentymarkets/shop-api/server',
      configuration: {
        api: {
          url: process.env.API_ENDPOINT,
          securityToken: process.env.API_SECURITY_TOKEN ?? '',
        },
      },
      errorHandler: (error: any, req: any, res: any) => {
        // override the default error handler to preserve the original error response
        // https://docs.alokai.com/middleware/guides/custom-error-handler#customize-the-error-handler
        if (error?.response?.status) {
          res.status(error.response.status).send(error.response?.data);
        } else {
          res.status(500).send(error);
        }
      },
    },
  },
};

export default config;
