import { File, Folder } from "./file.js";
import { FileExplorer } from "./fileExplorer.js";
import { folderToDeleteToAchieveSpace } from "./7.2.js";

describe("7.2", () => {
  it("Folder calculates the smallest folder below certain threshold", () => {
    const folderA = new Folder("a");
    const folderB = new Folder("b");
    const folderC = new Folder("c");
    const fileA = new File("a.txt", 20);
    const fileB = new File("b.txt", 50);
    const fileC = new File("c.txt", 100);

    folderA.addIFile(folderB);
    folderA.addIFile(folderC);
    folderA.addIFile(fileA);
    folderB.addIFile(fileB);
    folderC.addIFile(fileC);

    const result = folderA.smallestFolderAboveThreshold(100);
    expect(result).toBe(folderC);
  });

  it("File explorer returns right total space", () => {
    const fileExplorer = new FileExplorer();
    fileExplorer.addFile("a.txt", 100);
    fileExplorer.addFile("b.txt", 105);
    fileExplorer.totalSpace = 500;

    expect(fileExplorer.availableSpace()).toEqual(295);
  });

  it("File explorer returns folder required to clean space", () => {
    const fileExplorer = new FileExplorer();
    fileExplorer.addFile("a.txt", 100);
    fileExplorer.addFolder("a");
    fileExplorer.navigateTo("a");
    fileExplorer.addFile("b.txt", 105);
    fileExplorer.totalSpace = 500;

    const folderToClean = fileExplorer.folderToAchieveSpace(400);
    expect(folderToClean.size).toEqual(105);
  });

  it("Test with test.txt", async () => {
    const result = await folderToDeleteToAchieveSpace(
      70000000,
      30000000,
      "test.txt"
    );
    expect(result).toEqual(24933642);
  });

  it("Test with input.txt", async () => {
    const result = await folderToDeleteToAchieveSpace(
      70000000,
      30000000,
      "input.txt"
    );
    expect(result).toEqual(4370655);
  });
});
