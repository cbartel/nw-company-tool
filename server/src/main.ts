import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { router as loginRouter } from './routes/login.route';
import { router as userRouter } from './routes/user.route';
import { router as characterRouter } from './routes/character.route';
import { router as companyRouter } from './routes/company.route';
import { router as configRouter } from './routes/config.route';
import { router as adminRouter } from './routes/admin.route';
import { errorHandler, invalidTokenErrorHandler } from './routes/error.route';
import { ConfigService } from './service/config.service';
import { accountAdmin, accountEnabled } from './routes/auth.route';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());

const distDir = __dirname + '/app/';
app.use(express.static(distDir));

app.use('/api/character', accountEnabled);
app.use('/api/company', accountEnabled);
app.use('/api/admin', accountEnabled);
app.use('/api/admin', accountAdmin);

app.use('/api/login/', loginRouter);
app.use('/api/user/', userRouter);
app.use('/api/character/', characterRouter);
app.use('/api/company/', companyRouter);
app.use('/api/config/', configRouter);
app.use('/api/admin/', adminRouter);

app.all('/*', (req, res) => {
  res.sendFile('app/index.html', { root: __dirname });
});

app.use(invalidTokenErrorHandler);
app.use(errorHandler);

const config = ConfigService.get().getServerConfig();

app.listen(config.PORT || 8080);
