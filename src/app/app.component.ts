import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { VOICE_MESSAGE_SERVICE_TOKEN } from './services/voice-message.service';
import {
  debounceTime,
  map,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { Datum } from 'src/models/MessageModel';
import { FormControl, FormGroup } from '@angular/forms';
import { Period } from '../models/Period';
import { Duration } from '../models/Duration';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getValidFilterFormParams } from '../utils/getValidFilterFormParams';
import { filterMessages } from '../utils/filtersValidators';
import { IVoiceMessageService } from '../models/IVoiceMessageServie';

type FilterForm = {
  period: Period;
  phone: string;
  duration: Duration;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public formGroup = new FormGroup({
    period: new FormControl(Period.AllTime, { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    duration: new FormControl(Duration.All, { nonNullable: true }),
  });

  private _subscriptions: Subscription[] = [];

  public messages$: Observable<Datum[]>;

  public queryParams: Params = {};

  public offset = 10;

  public currentPage = 1;

  public pagesCount = 0;

  constructor(
    @Inject(VOICE_MESSAGE_SERVICE_TOKEN)
    private voiceMessageService: IVoiceMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.messages$ = this.voiceMessageService.getMessages();
  }

  public ngOnInit() {
    const queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.queryParams = params;
        this.formGroup.patchValue(getValidFilterFormParams(params), {
          emitEvent: false,
        });

        const page = Number(params['page']);
        this.currentPage = Number.isNaN(page) ? 1 : page;
      },
    );
    this.subscribeToFilteringFormChanges();
    this.subscribeToQueryParamsChanges();

    this._subscriptions.push(queryParamsSubscription);
  }

  public ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  public getTimeFormatted(timeString: string): Date {
    const hours = Math.floor(parseInt(timeString) / 60);
    const minutes = parseInt(timeString) % 60;
    return new Date(0, 0, 0, hours, minutes);
  }

  public subscribeToFilteringFormChanges() {
    const formGroupSubscription = this.formGroup.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.router.navigate([], {
          queryParams: { ...value, page: 1 },
          queryParamsHandling: 'merge',
        });
      });

    this._subscriptions.push(formGroupSubscription);
  }

  public paginateTo(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  public paginate(to: number) {
    const page = this.queryParams['page'];
    const pageNumber = Number(page);

    if (Number.isNaN(pageNumber)) {
      return;
    }

    const resultPageNumber = pageNumber + to;
    if (resultPageNumber >= 1 && resultPageNumber <= this.pagesCount) {
      this.router.navigate([], {
        queryParams: { page: resultPageNumber },
        queryParamsHandling: 'merge',
      });
    }
  }

  public resetQueryParams() {
    this.formGroup.setValue({
      period: Period.AllTime,
      phone: '',
      duration: Duration.All,
    });
  }

  public setPagesCount = (messages: Datum[]) => {
    this.pagesCount = Math.ceil(messages.length / this.offset);
  };

  public subscribeToQueryParamsChanges() {
    this.messages$ = this.route.queryParams.pipe(
      switchMap((params) => {
        return this.voiceMessageService
          .getMessages()
          .pipe(map(filterMessages(params)));
      }),
      tap(this.setPagesCount),
    );
  }

  protected readonly Period = Period;
  protected readonly Duration = Duration;
  protected readonly Array = Array;
}
