import { Observable } from 'rxjs';
import { Datum } from './MessageModel';

export interface IVoiceMessageService {
  getMessages(): Observable<Datum[]>;
}
