export class SignalTuner {
  public signal: string;

  constructor(signal: string) {
    this.signal = signal;
  }

  public numberOfCharactersBeforeMarkerIsAvailable(markerSize: number): number {
    const repeatedCharactersRegex = /(.).*\1/;

    for (var i = markerSize; i <= this.signal.length; i++) {
      const markerCandidate = this.signal.substring(i - markerSize, i);
      if (!repeatedCharactersRegex.test(markerCandidate)) {
        return i;
      }
    }

    return -1;
  }
}
