import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Recipients } from '@/models/recipients.model';
import { Recipient } from '@/interfaces/recipients.interface';
import { CreateRecipientsDto } from '@/dtos/recipients.dto';

class RecipientService {
  public async findRecipients(userId: number): Promise<Recipient[]> {
    if (isEmpty(userId))
      throw new HttpException(400, 'Please provide a valid user id');
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
    return findRecipient;
  }

  public async findDuplicate(
    tokenId: number,
    recipients: any
  ): Promise<Recipient[]> {
    const findDup: Recipient[] = await Recipients.query()
      .select()
      .from('recipients')
      .whereIn('recipients.address', recipients)
      .where('recipients.token_id', '=', tokenId);

    return findDup;
  }

  public async findRecipientByTokenId(tokenId: number): Promise<Recipient[]> {
    const findRecipient: Recipient[] = await Recipients.query()
      .select()
      .from('recipients')
      .where('recipients.token_id', '=', tokenId)
      .join('veris', 'veris.id', '=', 'recipients.token_id')
      .join('files', 'files.id', '=', 'veris.thumb_id')
      .select(
        'files.path as image',
        'veris.event_name as veri',
        'recipients.address as recipient',
        'recipients.operation',
        'recipients.state as status'
      );

    if (findRecipient.length === 0)
      throw new HttpException(409, 'No recipients exist for this token');

    return findRecipient;
  }

  public async createRecipients(
    user_id: number,
    token_id: number,
    addresses: CreateRecipientsDto[]
  ): Promise<Recipient[]> {
    if (addresses.length === 0)
      throw new HttpException(400, 'Recipient list is empty');
    addresses = [...new Set(addresses)];
    let duplicate_addresses = '';
    const duplicates = await this.findDuplicate(token_id, addresses);
    duplicates.forEach((duplicate) => {
      duplicate_addresses = `${duplicate_addresses} ${duplicate.address}`;
    });
    console.log(duplicate_addresses);
    if (duplicates.length !== 0)
      throw new HttpException(
        500,
        `${duplicate_addresses} has already entered.`
      );

    const recipients: Recipient[] = [];
    addresses.forEach((address) => {
      recipients.push({
        token_id,
        address, //fix this
        amount: 1,
        state: 'pending',
        created_by: user_id,
      });
    });

    const createRecipientData: Recipient[] = await Recipients.query()
      .insert(recipients)
      .into('recipients');
    if (!createRecipientData)
      throw new HttpException(500, `Internal server error`);

    return createRecipientData;
  }
}
export default RecipientService;
