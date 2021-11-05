import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as loginRouter } from './routes/login.route';
import { router as userRouter } from './routes/user.route';
import { router as characterRouter } from './routes/character.route';
import { router as configRouter } from './routes/config.route';
import { router as adminRouter } from './routes/admin.route';
import { errorHandler, httpErrorHandler } from './routes/error.route';
import { ConfigService } from './service/config.service';
import { accountAdmin, accountEnabled } from './routes/auth.route';
import * as process from 'process';

process.chdir(__dirname + '/../');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());

const distDir = __dirname + '/app/';
app.use(express.static(distDir));

app.use('/api/character', accountEnabled);
app.use('/api/admin', accountEnabled);
app.use('/api/admin', accountAdmin);

app.use('/api/login/', loginRouter);
app.use('/api/user/', userRouter);
app.use('/api/characters/', characterRouter);
app.use('/api/config/', configRouter);
app.use('/api/admin/', adminRouter);

app.all('/*', (req, res) => {
  res.sendFile('app/index.html', { root: __dirname });
});

app.use(httpErrorHandler);
app.use(errorHandler);

const config = ConfigService.get().getServerConfig();

app.listen(config.PORT || 8080);
