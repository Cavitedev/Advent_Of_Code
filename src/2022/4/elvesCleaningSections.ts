export class ElvesCleaningSections {
  public cleanSectionsGroups: ElveCleaningSections[];

  constructor(cleanSectionsGroups: ElveCleaningSections[]) {
    this.cleanSectionsGroups = cleanSectionsGroups;
  }

  static fromString(str: string): ElvesCleaningSections {
    const sectionsStr: string[] = str.split(",");
    const cleanSectionsGroups: ElveCleaningSections[] = [];

    for (const sectionStr of sectionsStr) {
      const sectionDivisions = sectionStr.split("-");
      const startDivision: number = +sectionDivisions.shift();
      const endDivision: number = +sectionDivisions.shift();

      let sections: number[] = [];
      for (let i = startDivision; i <= endDivision; i++) {
        sections.push(i);
      }
      cleanSectionsGroups.push(new ElveCleaningSections(sections));
    }
    return new ElvesCleaningSections(cleanSectionsGroups);
  }

  public doesOneGroupFullyOverlapOthers(): boolean {
    for (const elveI of this.cleanSectionsGroups) {
      let hasOverlapped: boolean;
      for (const elveJ of this.cleanSectionsGroups) {
        if (elveI === elveJ) continue;
        hasOverlapped = elveI.fullyOverlapsWith(elveJ);

        if (!hasOverlapped) break;
      }

      if (hasOverlapped) return true;
    }

    return false;
  }

  public isThereAnyOverlapping(): boolean {
    for (const elveI of this.cleanSectionsGroups) {
      let hasOverlapped: boolean;
      for (const elveJ of this.cleanSectionsGroups) {
        if (elveI === elveJ) continue;
        hasOverlapped = elveI.overlapsWith(elveJ);

        if (!hasOverlapped) break;
      }

      if (hasOverlapped) return true;
    }

    return false;
  }
}

export class ElveCleaningSections {
  public sections: number[];

  constructor(sections: number[]) {
    this.sections = sections;
  }

  public fullyOverlapsWith(other: ElveCleaningSections): boolean {
    let overlapsFirst = true;
    for (const num of this.sections) {
      if (!other.sections.includes(num)) {
        overlapsFirst = false;
        break;
      }
    }

    if (overlapsFirst) return true;

    for (const num of other.sections) {
      if (!this.sections.includes(num)) {
        return false;
      }
    }
    return true;
  }

  public overlapsWith(other: ElveCleaningSections): boolean {
    for (const num of this.sections) {
      if (other.sections.includes(num)) {
        return true;
      }
    }
    return false;
  }
}
