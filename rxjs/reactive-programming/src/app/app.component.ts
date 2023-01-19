import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected numbers: Observable<number> = interval(1000)
  protected takeThree: Observable<string> = this.numbers.pipe(take(3), map((value) => `${value} - ${Date.now()}`))

  ngOnInit(): void {
    this.takeThree.subscribe(value => console.log(value))
  }

}
