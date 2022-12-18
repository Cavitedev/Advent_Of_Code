export class LavaMap{

    public boulders: LavaBoulder[][][];
    
    public connectedFaces:number;

    constructor(size: number){
        this.boulders = [];

        for(let x = 0; x<size; x++){
            const boulderMatrix: LavaBoulder[][] = []
            for(let y = 0; y<size; y++){
                const boulderRow: LavaBoulder[] = []
                for(let z = 0; z<size; z++){
                    boulderRow[z] = new LavaBoulder(x, y, z);
                }
                boulderMatrix.push(boulderRow)
            }
            this.boulders.push(boulderMatrix);
        }


        this.connectedFaces = 0
    }


    public readLine(line:string){
        const splittedLine = line.split(",");

        const xPos = +splittedLine[0];
        const yPos = +splittedLine[1];
        const zPos = +splittedLine[2];

        this.boulders[xPos][yPos][zPos].isBoulder = true;
        this.connectedFaces += 6;
        const adyPositions = this._adyacentBouldersTo(xPos, yPos, zPos);
        this.connectedFaces -= adyPositions * 2;
    }

    public excludeInteriorArea(){
        const size = this.boulders.length;
        const outerEmptyPos = this.boulders.flat(2).filter(b => !b.isBoulder && b.isPointingOutwards(size));
        outerEmptyPos.forEach((v, i, a) => {
            a[i].isExterior = true;
        })

        for(let x = 1; x<size-1; x++){
            for(let y = 1; y<size-1; y++){
                for(let z = 1; z<size-1; z++){
                    const boulder = this.boulders[x][y][z];
                    if(!boulder.isBoulder && !boulder.isExterior){
                        const adyPositions = this._adyacentPositionsTo(x,y,z);
                        const isExterior = adyPositions.find(p => p.isExterior);
                        if(isExterior){
                            boulder.isExterior = true;
                            this._addToExteriorRecursively(boulder);
                        }

                    }
                }
            }
        }

        const interiorPositions = this.boulders.flat(2).filter(b => !b.isExterior && !b.isBoulder);
        for(const intPos of interiorPositions){
            const adyBoulders = this._adyacentBouldersTo(intPos.x, intPos.y, intPos.z);
            this.connectedFaces -= adyBoulders;
        }

    }

    private _addToExteriorRecursively(boulder:LavaBoulder){
        const interiorEmptyPositions = this._adyacentPositionsTo(boulder.x,boulder.y,boulder.z).filter(b => !b.isExterior && !b.isBoulder);
        for(const pos of interiorEmptyPositions){
            pos.isExterior = true;
            this._addToExteriorRecursively(pos);
        }

    }

    private _adyacentPositionsTo(x:number, y:number, z:number): LavaBoulder[]{
        const adyBoulders: LavaBoulder[] = [];
        adyBoulders.push(this.boulders[x + 1]?.[y]?.[z]);
        adyBoulders.push(this.boulders[x - 1]?.[y]?.[z]);
        adyBoulders.push(this.boulders[x]?.[y + 1]?.[z]);
        adyBoulders.push(this.boulders[x]?.[y - 1]?.[z]);
        adyBoulders.push(this.boulders[x]?.[y]?.[z + 1]);
        adyBoulders.push(this.boulders[x]?.[y]?.[z - 1]);

        //Remove not defined
        return adyBoulders.filter(b => b);


    }

    private _adyacentBouldersTo(x:number, y:number, z:number):number{

        return this._adyacentPositionsTo(x, y, z).filter(p => p.isBoulder).length;
    }

}

class LavaBoulder{

    public isBoulder:boolean;
    public isExterior: boolean;
    public x:number;
    public y:number;
    public z:number;

    constructor(x:number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.isBoulder = false;
        this.isExterior= false;
    }

    public isPointingOutwards(size: number): boolean{
        return this.x=== 0 || this.x === size - 1 ||
        this.y=== 0 || this.y === size - 1 ||
        this.z=== 0 || this.z === size - 1;
    }

}