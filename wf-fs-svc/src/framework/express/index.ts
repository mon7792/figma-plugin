
import express, {Express} from 'express';
import cors from "cors";
import { WireFrameController } from '../../controller/wireframe';
import session from 'express-session';

// ExpressApp class register the rotues and start the server.
export class ExpressApp{
    private app: Express;
    private port: number;
    public controller: WireFrameController

    constructor(port: number, controller: WireFrameController){
        this.app = express();
        this.port = port;
        this.controller = controller;
    }

    // register routes & middleware
    public register(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(session({
            cookie: { maxAge: 86400000 },
            resave: false,
            secret: 'keyboard cat'
        }))
        // console.log(this.controller.uploadFileHandler);
        this.app.get('/', this.controller.homeHandler)
        this.app.get('/status/:id', this.controller.statusFileHandler)
        this.app.post('/upload', this.controller.uploadFileHandler)

        // plugin authentication
        // plugin get keys: return the read keys and write keys.
        this.app.get('/plugin/keys', this.controller.pluginKeyGenHandler)
        this.app.get('/plugin/keys/:key', this.controller.pluginKeyStatusHandler)
    }

    // start the server
    public start(){
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}