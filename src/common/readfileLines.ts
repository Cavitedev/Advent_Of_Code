import { default as fs } from "fs";
import { default as readline } from "readline";
import { default as path } from "path";

export function readFileLines(
  dirname: string,
  file: string
): readline.Interface {
  const fileStream = fs.createReadStream(
    path.normalize(path.join(dirname, file)),
    {
      encoding: "utf8",
    }
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
