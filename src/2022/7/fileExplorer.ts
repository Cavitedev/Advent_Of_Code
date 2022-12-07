import { IFile, File, Folder } from "./file.js";

export class FileExplorer {
  public rootFolder: Folder;
  public currentFolder: Folder;
  public totalSpace: number;

  constructor() {
    this.rootFolder = new Folder("/");
    this.currentFolder = this.rootFolder;
  }

  public navigateTo(dirName: string) {
    if (dirName === "..") {
      this.currentFolder = this.currentFolder.parent;
      return;
    }
    if (dirName === "/") {
      this.currentFolder = this.rootFolder;
      return;
    }

    const folderTarget: IFile = this.currentFolder.getChildByName(dirName);
    if (!(folderTarget instanceof Folder)) {
      return;
    }

    this.currentFolder = folderTarget;
  }

  public lsLine(line: string) {
    const values = line.split(" ");
    const name = values[1];
    if (values[0] === "dir") {
      this.addFolder(name);
      return;
    }

    const fileSize = +values[0];
    this.addFile(name, fileSize);
  }

  public addFolder(dirName: string) {
    this.currentFolder.addIFile(new Folder(dirName));
  }

  public addFile(dirName: string, fileSize: number) {
    this.currentFolder.addIFile(new File(dirName, fileSize));
  }

  public availableSpace(): number {
    return this.totalSpace - this.rootFolder.size;
  }
  public folderToAchieveSpace(spaceRequired: number): Folder {
    const requiredSpaceToDelete = spaceRequired - this.availableSpace();

    if (requiredSpaceToDelete < 0) return null;
    return this.rootFolder.smallestFolderAboveThreshold(requiredSpaceToDelete);
  }
}
