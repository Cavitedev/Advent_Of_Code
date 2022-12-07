import { FileExplorer } from "./fileExplorer.js";

export class Terminal{
    public fileExplorer: FileExplorer;

    constructor(){
        this.fileExplorer = new FileExplorer();
    }

    public readLine(line: string){
        const params = line.split(" ");

        if(params[0] === '$'){
            //Command
            if(params[1] === "cd"){
                const folder = params[2];
                this.fileExplorer.navigateTo(folder);
            }
        }else{
            this.fileExplorer.lsLine(line);
        }
    }
}