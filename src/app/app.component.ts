import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/nav/navbar/navbar.component';
import {MenuService} from './services/menu.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Restaurant_Web';

  constructor(private menuService: MenuService) {
  }
  ngOnInit() {
    const isMenusFetched = sessionStorage.getItem('isMenusFetched');
    if (!isMenusFetched) {
      this.menuService.fetchMenus();
      sessionStorage.setItem('isMenusFetched', 'true');
    }
  }
}
