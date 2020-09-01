import app from '@src/interface/App';
import config from '@src/config';
import logger from '@src/infrastructure/logger/logger';

const port = config.expressPort;

app.listen(port, () => {
  logger.info(`App started on port ${port}`);
});
