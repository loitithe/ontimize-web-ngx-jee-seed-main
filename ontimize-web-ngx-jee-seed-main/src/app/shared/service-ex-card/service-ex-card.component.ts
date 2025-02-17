import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StarsWarsService } from '../star-wars.service';

@Component({
  selector: 'app-service-ex-card',
  templateUrl: './service-ex-card.component.html',
  styleUrls: ['./service-ex-card.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.home-card]': 'true'
  },
  providers: [StarsWarsService]
})
export class ServiceExCardComponent implements OnInit {
  filmsAmount: number;

  constructor(
    private starswars: StarsWarsService,
    private cd: ChangeDetectorRef
  ) {
    this.starswars.query({}, ['uuid'], 'films').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.filmsAmount = res.data.length;
        } else {
          this.filmsAmount = undefined;
        }

      },
      err => console.log(err),
      () => this.cd.detectChanges()
    );
  }

  ngOnInit() {
  }
}