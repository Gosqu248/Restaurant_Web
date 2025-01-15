import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-google-callback',
  imports: [],
  templateUrl: './google-callback.component.html',
  standalone: true,
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        console.log('token', token);
        localStorage.setItem('jwt', token);
        this.authService.setAuth();
        this.router.navigate(['/']);
      }
    })
  }
}
