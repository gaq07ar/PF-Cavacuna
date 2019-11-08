export class Slot {
  public slotNumber: number;
  public vaccineDescription: string;
  public isApplied: boolean;

  constructor(
    slotNumber: number,
    vaccineDescription: string,
    isApplied: boolean
  ) {
    this.slotNumber = slotNumber;
    this.vaccineDescription = vaccineDescription;
    this.isApplied = isApplied;
  }
}
