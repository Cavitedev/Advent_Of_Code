import { default as fs } from "fs";
import { default as readline } from "readline";
import { Runsack } from "./Runsack.js";

export async function runsackPrioritiesSum(
  compartments: number = 2,
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let sumPriorities = 0;


  for await (const line of rl) {

    const runsack = Runsack.fromSingleItemsList(line, compartments);
    const sharedItemsPriorities = runsack.sharedItemsPrioritiesSum();
    sumPriorities += sharedItemsPriorities;
    
  }

  console.log(sumPriorities);
  return sumPriorities;
}

export async function runsackPrioritiesSumGroups(
  groupsCount: number = 3,
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let sumPriorities = 0;

  let groups = [];
  let currentGroup = 0;
  for await (const line of rl) {


    const runsack = new Runsack([line]);
    const sharedItemsPriorities = runsack.sharedItemsPrioritiesSum();
    sumPriorities += sharedItemsPriorities;
    
  }

  console.log(sumPriorities);
  return sumPriorities;
}

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/3/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
