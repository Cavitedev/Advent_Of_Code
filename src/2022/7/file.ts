export interface IFile {
  name: string;
  get size(): number;
  parent: Folder;
}

export class File implements IFile {
  public size: number;
  public name: string;
  public parent: Folder;

  constructor(name: string, size: number) {
    this.size = size;
    this.name = name;
  }
}

export class Folder implements IFile {
  name: string;
  iFiles: IFile[];
  public parent: Folder;

  constructor(name: string) {
    this.name = name;
    this.iFiles = [];
  }

  public addIFile(file: IFile) {
    file.parent = this;
    this.iFiles.push(file);
  }

  public get size(): number {
    return this.iFiles.reduce<number>((acumulator, file) => {
      return (acumulator += file.size);
    }, 0);
  }

  public getChildByName(name: string): IFile {
    return this.iFiles.filter((iFile) => iFile.name === name)[0] ?? null;
  }

  public sumFolderSizesBelowThreshold(threshold: number): number {
    const childFolders = [this, ...this.allFoldersInsideFolder()];
    let totalSize = 0;
    for (const folder of childFolders) {
      if (folder.size <= threshold) {
        totalSize += folder.size;
      }
    }

    return totalSize;
  }

  public smallestFolderAboveThreshold(threshold: number): Folder {
    const childFolders = [this, ...this.allFoldersInsideFolder()];
    const orderedFolders = childFolders.sort((a, b) => a.size - b.size);
    for(const folder of orderedFolders){
      if(folder.size >= threshold){
        return folder;
      }
    }
  }

  public allFoldersInsideFolder(): Folder[] {
    const folders = [];
    for (const iFile of this.iFiles) {
      if (iFile instanceof Folder) {
        folders.push(iFile as Folder);
        folders.push(...iFile.allFoldersInsideFolder());
      }
    }
    return folders;
  }
}
