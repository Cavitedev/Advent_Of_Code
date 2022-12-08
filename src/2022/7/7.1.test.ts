import { File, Folder } from "./file.js";
import { FileExplorer } from "./fileExplorer.js";
import { Terminal } from "./terminal.js";
import { foldersBelowThresholdTotalSize } from "./7.1.js";

describe("7.1", () => {
  describe("IFolder", () => {
    it("Empty folder has size 0", () => {
      const folder = new Folder("a");

      expect(folder.size).toEqual(0);
    });
    it("Folder size when it has two files returns right size", () => {
      const folder = new Folder("a");
      const file1 = new File("a.txt", 1);
      const file2 = new File("b.txt", 2);

      folder.addIFile(file1);
      folder.addIFile(file2);

      expect(folder.size).toEqual(3);
    });

    it("File generates right parent when it is added", () => {
      const folder = new Folder("a");
      const file = new File("a.txt", 1);

      folder.addIFile(file);

      expect(file.parent).toBe(folder);
    });

    it("Folder asking for unexistent child returns null", () => {
      const folder = new Folder("a");

      expect(folder.getChildByName("b")).toBeNull();
    });

    it("Folder asking for existent child returns child", () => {
      const folder = new Folder("a");
      const file = new File("a.txt", 1);

      folder.addIFile(file);
      expect(folder.getChildByName("a.txt")).toBe(file);
    });

    it("Folder recursively gets folders inside folder", () => {
      const folderA = new Folder("a");
      const folderB = new Folder("b");
      const folderC = new Folder("c");
      const folderD = new Folder("d");
      const fileA = new File("a.txt", 2);

      folderA.addIFile(folderB);
      folderA.addIFile(folderC);
      folderB.addIFile(fileA);
      folderB.addIFile(folderD);

      const result = folderA.allFoldersInsideFolder();
      const expected = [folderB, folderD, folderC];
      expect(result).toEqual(expected);
    });

    it("Folder asking sumFolderSizesBelowThreshold returns the total sum size of folders below or equal to the threshold", () => {
      const folderA = new Folder("a");
      const folderB = new Folder("b");
      const folderC = new Folder("c");
      const fileA = new File("a.txt", 1);
      const fileB = new File("b.txt", 2);
      const fileC = new File("c.txt", 100000);

      folderA.addIFile(folderB);
      folderA.addIFile(folderC);
      folderA.addIFile(fileA);
      folderB.addIFile(fileB);
      folderC.addIFile(fileC);

      //Folder c = 100000 + Folder b = 2 → 100002, Folder a > 100000, it doesn't count
      const result = folderA.sumFolderSizesBelowThreshold(100000);
      expect(result).toEqual(100002);
    });

    it("Folder asking sumFolderSizesBelowThreshold returns the total sum size including folder asking it", () => {
      const folderA = new Folder("a");
      const fileA = new File("a.txt", 1);

      folderA.addIFile(fileA);

      const result = folderA.sumFolderSizesBelowThreshold(100000);
      expect(result).toEqual(1);
    });

    it("Folder asking sumFolderSizesBelowThreshold with many recursive folder works", () => {
      const folderA = new Folder("a");
      const folderB = new Folder("b");
      const folderC = new Folder("c");
      const folderD = new Folder("d");
      const fileA = new File("a.txt", 1);

      folderA.addIFile(folderB);
      folderB.addIFile(folderC);
      folderC.addIFile(folderD);
      folderD.addIFile(fileA);

      //4, 1 for each folder
      const result = folderA.sumFolderSizesBelowThreshold(100000);
      expect(result).toEqual(4);
    });
  });

  describe("File explorer", () => {
    it("File explorer adds dir when entering ls information", () => {
      const fileExplorer = new FileExplorer();

      const fileName = "a";
      const lsCommand = `dir ${fileName}`;
      fileExplorer.lsLine(lsCommand);

      expect(fileExplorer.currentFolder.iFiles[0].name).toEqual(fileName);
    });

    it("File explorer adds file when entering ls information", () => {
      const fileExplorer = new FileExplorer();

      const fileSize = 14848514;
      const fileName = "b.txt";
      const lsCommand = `${fileSize} ${fileName}`;
      fileExplorer.lsLine(lsCommand);

      expect(fileExplorer.currentFolder.iFiles[0].name).toEqual(fileName);
      expect(fileExplorer.currentFolder.iFiles[0].size).toEqual(fileSize);
    });

    it("File explorer navigating to unexistent folder does nothing", () => {
      const fileExplorer = new FileExplorer();
      fileExplorer.navigateTo("a");

      expect(fileExplorer.currentFolder).toBe(fileExplorer.rootFolder);
    });

    it("File explorer navigating to file as if it were a folder dos nothing", () => {
      const fileExplorer = new FileExplorer();
      fileExplorer.addFile("a", 100);
      fileExplorer.navigateTo("a");

      expect(fileExplorer.currentFolder).toBe(fileExplorer.rootFolder);
    });

    it("File explorer navigating to folder moves currentFolder to that folder", () => {
      const fileExplorer = new FileExplorer();
      fileExplorer.addFolder("a");
      fileExplorer.navigateTo("a");

      expect(fileExplorer.currentFolder).toBe(
        fileExplorer.rootFolder.iFiles[0]
      );
    });

    it("File explorer moves to upper folder when '..' is entered on navigateTo", () => {
      const fileExplorer = new FileExplorer();
      fileExplorer.addFolder("a");
      fileExplorer.navigateTo("a");
      fileExplorer.navigateTo("..");

      expect(fileExplorer.currentFolder).toBe(fileExplorer.rootFolder);
    });
  });

  describe("Terminal", () => {
    it("Reading dir line, creates folder", () => {
      const terminal = new Terminal();

      const fileName = "a";
      const terminalLine = `dir ${fileName}`;

      terminal.readLine(terminalLine);

      const fileExplorer = terminal.fileExplorer;
      expect(fileExplorer.currentFolder.iFiles[0].name).toEqual(fileName);
    });

    it("Reading file line, creates folder", () => {
      const terminal = new Terminal();

      const fileSize = 14848514;
      const fileName = "b.txt";
      const terminalLine = `${fileSize} ${fileName}`;

      terminal.readLine(terminalLine);

      const fileExplorer = terminal.fileExplorer;
      expect(fileExplorer.currentFolder.iFiles[0].name).toEqual(fileName);
      expect(fileExplorer.currentFolder.iFiles[0].size).toEqual(fileSize);
    });

    it("Reads cd a moves to folder a", () => {
      const terminal = new Terminal();
      const dirName = "a";

      terminal.readLine(`dir ${dirName}`);
      terminal.readLine(`$ cd ${dirName}`);

      const fileExplorer = terminal.fileExplorer;
      expect(fileExplorer.currentFolder.name).toEqual(dirName);
    });

    it("Reads cd .. moves to parent folder", () => {
      const terminal = new Terminal();
      const dirName = "a";

      terminal.readLine(`dir ${dirName}`);
      terminal.readLine(`$ cd ${dirName}`);
      terminal.readLine(`$ cd ..`);

      const fileExplorer = terminal.fileExplorer;
      expect(fileExplorer.currentFolder).toBe(fileExplorer.rootFolder);
    });

    it("Reads cd / moves to root folder", () => {
      const terminal = new Terminal();
      const dirName = "a";

      terminal.readLine(`dir ${dirName}`);
      terminal.readLine(`$ cd ${dirName}`);
      terminal.readLine(`$ cd /`);

      const fileExplorer = terminal.fileExplorer;
      expect(fileExplorer.currentFolder).toBe(fileExplorer.rootFolder);
    });
  });

  it("Test with test.txt", async () => {
    const result = await foldersBelowThresholdTotalSize(100000, "test.txt");

    expect(result).toEqual(95437);
  });

  it("Test with input.txt", async () => {
    const result = await foldersBelowThresholdTotalSize(100000, "input.txt");

    expect(result).toEqual(1783610);
  });
});
