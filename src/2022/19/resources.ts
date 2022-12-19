export interface IResources{
    ore?: number;
    clay?:number;
    obsidian?:number;
    geode?:number
}

export class Resources{
    public ore: number;
    public clay:number ;
    public obsidian:number;
    public geode:number;

    constructor(resources: IResources){
        this.ore = resources.ore ?? 0;
        this.clay = resources.clay ?? 0;
        this.obsidian = resources.obsidian ?? 0;
        this.geode = resources.geode ?? 0;
    }

    public ores():number[]{
        return [this.ore, this.clay, this.obsidian, this.geode];
    }


    public add(other: Resources) : Resources{

        return new Resources({ore: this.ore + other.ore, clay: this.clay + other.clay, obsidian: this.obsidian + other.obsidian, geode: this.geode + other.geode});
    }

    public subtract(other: Resources) : Resources{

        return new Resources({ore: this.ore - other.ore, clay: this.clay - other.clay, obsidian: this.obsidian - other.obsidian, geode: this.geode - other.geode});
    }

    public lessOrEqualThan(other:Resources): boolean{
        return this.ore <= other.ore && this.clay <= other.clay && this.obsidian <= other.obsidian && this.geode <= other.geode;
    }

    public multiplyBy(amount:number): Resources{
        return new Resources({ore: this.ore * amount, clay: this.clay * amount, obsidian: this.obsidian * amount, geode: this.geode * amount})
    }

    public clone(): Resources{
        return new Resources({ore: this.ore, clay: this.clay, obsidian: this.obsidian, geode:this.geode});
    }
}