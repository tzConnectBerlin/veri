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
      .where('created_by', '=', userId);

    return findRecipient;
  }
}

export default RecipientService;
