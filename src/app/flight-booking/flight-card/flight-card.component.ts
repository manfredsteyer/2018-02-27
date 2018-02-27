import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  ViewEncapsulation, ElementRef,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private element: ElementRef, private zone: NgZone) {
    console.debug('ctor', this.selected, this.item);
  }


  ngOnInit() {
    console.debug('onInit', this.selected, this.item);
    // this.selectedChange.next(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.debug('onChanges', this.selected, this.item);

    if (changes['selected']) {
      console.debug('\tselected changed');
    }
  }

  ngOnDestroy(): void {
    console.debug('onDestroy', this.selected, this.item);
  }

  select() {
    this.selected = true;
    this.selectedChange.next(true);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.next(false);
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }

}
