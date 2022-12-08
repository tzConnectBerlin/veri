import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Recipients } from '@/models/recipients.model';
import { Recipient } from '@/interfaces/recipients.interface';

class RecipientService {
  public async findRecipients(userId: number): Promise<Recipient[]> {
    if (isEmpty(userId))
      throw new HttpException(400, 'Please provide a valid user id');
    console.log(userId);
    const findRecipient: Recipient[] = await Recipients.query()
      .select()
      .from('recipients')
      .where('recipients.created_by', '=', userId)
      .join('veris', 'veris.id', '=', 'recipients.token_id')
      .join('files', 'files.id', '=', 'veris.thumb_id')
      .select(
        'files.path as image',
        'veris.event_name as veri',
        'recipients.address as recipient',
        'recipients.operation',
        'recipients.state as status'
      );
    console.log(findRecipient);
    return findRecipient;
  }
}

export default RecipientService;
