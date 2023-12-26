import { Observable } from 'rxjs';
import { Message } from './MessageModel';

export interface IVoiceMessageService {
  getMessages(): Observable<Message[]>;
}
