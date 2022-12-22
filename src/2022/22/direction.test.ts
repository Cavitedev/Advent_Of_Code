import { BackCubeSide, LeftCubeSide, RightCubeSide } from "./cubeSide.js";
import { Left, Right } from "./direction.js";

describe("Direction tests", () => {
  it("Direction between right side and back side is right", () => {
    expect(RightCubeSide.Instance.dirToSide(BackCubeSide.Instance)).toBe(
      Right.Instance
    );
  });

  it("Direction between back side and right side is left", () => {
    expect(BackCubeSide.Instance.dirToSide(RightCubeSide.Instance)).toBe(
      Left.Instance
    );
  });

  it("Direction between back side and left side is right", () => {
    expect(BackCubeSide.Instance.dirToSide(LeftCubeSide.Instance)).toBe(
      Right.Instance
    );
  });
});
