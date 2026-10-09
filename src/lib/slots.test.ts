import { describe, expect, it } from "vitest";
import { availableSlots, daySlots, slotToIso } from "./slots";

const now = new Date("2026-10-12T12:00:00Z"); // Mon 09:00 Mendoza

describe("booking slots", () => {
  it("offers 45-min slots 9–13 and 16–19", () => {
    expect(daySlots()).toEqual(["09:00", "09:45", "10:30", "11:15", "12:00", "16:00", "16:45", "17:30", "18:15"]);
  });
  it("offers nothing on weekends", () => {
    expect(availableSlots("2026-10-17", [], now)).toEqual([]);
    expect(availableSlots("2026-10-18", [], now)).toEqual([]);
  });
  it("offers nothing on past dates", () => {
    expect(availableSlots("2026-10-09", [], now)).toEqual([]);
  });
  it("hides slots already passed today", () => {
    expect(availableSlots("2026-10-12", [], now)[0]).toBe("09:45");
  });
  it("hides booked slots", () => {
    const taken = [slotToIso("2026-10-13", "10:30")];
    expect(availableSlots("2026-10-13", taken, now)).not.toContain("10:30");
  });
});
