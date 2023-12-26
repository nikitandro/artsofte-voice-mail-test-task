import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Data } from 'src/models/MessageModel';
import { parseStringPromise } from 'xml2js';
import { map, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { IVoiceMessageService } from '../../models/IVoiceMessageServie';

export const VOICE_MESSAGE_SERVICE_TOKEN =
  new InjectionToken<VoiceMessageService>('VoiceMessageService');

@Injectable()
export class VoiceMessageService implements IVoiceMessageService {
  constructor(private httpService: HttpClient) {}
  public getMessages() {
    return this.httpService
      .get('../../assets/data.xml', { responseType: 'text' })
      .pipe(
        switchMap((value) => {
          return fromPromise(
            parseStringPromise(value, {
              normalizeTags: true,
              normalize: true,
            }),
          ).pipe(map((value: Data) => value.root.data));
        }),
      );
  }
}
