export class Device {
  public id: number;
  public slots_amount: number;
  public monitored_mode: boolean;
  public description: string;
  public min_temp: number;
  public max_temp: number;

  constructor(
    id: number,
    slots_amount: number,
    monitored_mode: boolean,
    description: string,
    min_temp: number,
    max_temp: number
  ) {
    this.id = id;
    this.slots_amount = slots_amount;
    this.monitored_mode = monitored_mode;
    this.description = description;
    this.min_temp = min_temp;
    this.max_temp = max_temp;
  }
}
