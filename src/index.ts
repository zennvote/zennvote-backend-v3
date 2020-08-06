import app from '@src/interface/App';
import config from '@src/config';

const port = config.expressPort;

app.listen(port, () => {
  console.log(`App started on port ${port}`)
});
