import App from './app';
import AuthRoute from './routes/auth.route';
import EventsRoute from './routes/events.route';
import IndexRoute from './routes/index.route';
import RecipientsRoute from './routes/recipient.route';
import ScannerRoute from './routes/scanner.route';
import UsersRoute from './routes/users.route';
import VerisRoute from './routes/veris.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new VerisRoute(),
  new RecipientsRoute(),
  new EventsRoute(),
  new ScannerRoute(),
]);

app.listen();
