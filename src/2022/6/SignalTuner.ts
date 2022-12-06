export class SignalTuner {
  public signal: string;

  constructor(signal: string) {
    this.signal = signal;
  }

  public numberOfCharactersBeforeMarkerIsAvailable(markerSize: number): number {
    const repeatedCharactersRegex = /(.).*\1/;
    let markerCandidate = this.signal.substring(0, markerSize);

    for (var i = markerSize; i < this.signal.length; i++) {
      if (!repeatedCharactersRegex.test(markerCandidate)) {
        return i;
      }
      markerCandidate = this.signal.substring(i-markerSize + 1, i+1)
    }

    return -1;
  }
}
