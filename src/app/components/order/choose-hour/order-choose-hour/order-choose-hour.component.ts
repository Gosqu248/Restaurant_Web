import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {RestaurantInfoService} from '../../../../services/restaurant-info.service';
import {MatDialog} from '@angular/material/dialog';
import {ChooseHourDialogComponent} from '../choose-hour-dialog/choose-hour-dialog.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-order-choose-hour',
  imports: [
    NgClass,
    NgIf,
    MatIcon
  ],
  templateUrl: './order-choose-hour.component.html',
  styleUrl: './order-choose-hour.component.scss'
})
export class OrderChooseHourComponent implements OnInit{
  deliveryOption: string = '';
  selectedHourOption: string | null = null;
  selectedHour: string | null = null;
  pickUpTimeMin: number = 0;
  pickUpTimeMax: number = 0;

  constructor(private infoService: RestaurantInfoService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPickUpTime();
  }

  getPickUpTime(): void {
    this.pickUpTimeMin = this.infoService.pickUpTimeMin;
    this.pickUpTimeMax = this.infoService.pickUpTimeMax;
  }

  setDelivery(option: string | null): void {
    this.selectedHourOption = option;
    this.infoService.setSelectedHour(option);
    if (option === 'scheduled') {
      this.openHourDialog();
    }
  }

  openHourDialog(): void {
    const dialogRef = this.dialog.open(ChooseHourDialogComponent, {
      width: '700px',
      maxWidth: '100%',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.selectedHour = result;
        this.infoService.setSelectedHour(result);
      } else {
        this.setDelivery(null)
      }
    });
  }

  isDeliveryOptionSelected(option: string): boolean {
    return this.selectedHourOption === option;
  }
}
