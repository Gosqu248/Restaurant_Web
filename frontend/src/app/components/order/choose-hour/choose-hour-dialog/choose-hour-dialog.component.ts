import {Component, OnInit} from '@angular/core';
import {RestaurantInfoService} from '../../../../services/restaurant-info.service';
import {DeliveryHour} from '../../../../interfaces/delivery-hour';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-choose-hour-dialog',
  imports: [
    NgForOf,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './choose-hour-dialog.component.html',
  styleUrl: './choose-hour-dialog.component.scss'
})
export class ChooseHourDialogComponent implements OnInit{
  selectedHour: string | null = null;
  availableHours: string[] = [];
  maxPickUpTime: number = 0;
  currentHour: DeliveryHour | undefined = undefined;

  constructor(private infoService: RestaurantInfoService,
              public dialogRef: MatDialogRef<ChooseHourDialogComponent>) {
  }

  ngOnInit() {
    this.generateAvailableHours();
  }

  generateAvailableHours(): void {
    this.maxPickUpTime = this.infoService.pickUpTimeMax;
    this.currentHour = this.infoService.getCurrentOpeningHours();

    if (this.currentHour) {
      const openingTime = this.currentHour.openTime.split(':');
      const closingTime = this.currentHour.closeTime.split(':');
      const closingHour = parseInt(closingTime[0]);
      const closingMinutes = parseInt(closingTime[1]);

      const currentTime = new Date();
      currentTime.setHours(parseInt(openingTime[0]), parseInt(openingTime[1]), 0, 0);
      currentTime.setMinutes(currentTime.getMinutes() + this.maxPickUpTime);

      while (currentTime.getHours() < closingHour || (currentTime.getHours() === closingHour && currentTime.getMinutes() <= closingMinutes)) {
        this.availableHours.push(currentTime.toTimeString().substring(0, 5));
        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }
    }
  }

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  confirmSelection() {
    this.dialogRef.close(this.selectedHour);
  }

}
