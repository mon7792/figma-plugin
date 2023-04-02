
import express, {Express} from 'express';
import { WireFrameController } from '../../controller/wireframe';

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
        console.log(this.controller.uploadFileHandler);
        this.app.get('/status/:id', this.controller.statusFileHandler)

        this.app.post('/upload', this.controller.uploadFileHandler)
    }

    // start the server
    public start(){
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}