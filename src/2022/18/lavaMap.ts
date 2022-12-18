export class LavaMap{

    public boulders: boolean[][][];
    public connectedFaces:number;

    constructor(size: number){
        this.boulders = Array(size).fill(Array(size).fill(Array(size).fill(false))).map(m => m.map((r: any[]) => r.map(() => false)))

        this.connectedFaces = 0
    }


    public readLine(line:string){
        const splittedLine = line.split(",");

        const xPos = +splittedLine[0];
        const yPos = +splittedLine[1];
        const zPos = +splittedLine[2];

        this.boulders[xPos][yPos][zPos] = true;
        this.connectedFaces += 6;
        const adyPositions = this._adyacentBouldersTo(xPos, yPos, zPos);
        this.connectedFaces -= adyPositions * 2;
    }

    public excludeInteriorArea(){
        this.boulders.forEach((matrix, x) => {
            matrix.forEach((row, y) => {
                row.forEach((value, z)=> {
                    if(!value && this._adyacentBouldersTo(x,y,z) === 6){
                        this.connectedFaces -=6;
                    }
                })
            })
        })
    }

    private _adyacentBouldersTo(x:number, y:number, z:number):number{

        let adyPositions = 0;

        adyPositions += this.boulders[x + 1]?.[y]?.[z] ? 1 : 0;
        adyPositions += this.boulders[x - 1]?.[y]?.[z] ? 1 : 0;
        adyPositions += this.boulders[x]?.[y + 1]?.[z] ? 1 : 0;
        adyPositions += this.boulders[x]?.[y - 1]?.[z] ? 1 : 0;
        adyPositions += this.boulders[x]?.[y]?.[z + 1] ? 1 : 0;
        adyPositions += this.boulders[x]?.[y]?.[z - 1] ? 1 : 0;


        return adyPositions;

    }

}