import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Recipients } from '@/models/recipients.model';
import { Recipient } from '@/interfaces/recipients.interface';
import { PEPPERMINTERY_URL } from '@/config';
import axios from 'axios';

class RecipientService {
  private async getRecipients(userId: number): Promise<Recipient[]> {
    return Recipients.query()
      .select()
      .from('recipients')
      .where('recipients.created_by', '=', userId)
      .join('veris', 'veris.id', '=', 'recipients.token_id')
      .join('files', 'files.id', '=', 'veris.thumb_id')
      .select(
        'files.path as image',
        'veris.event_name as veri',
        'recipients.address as recipient',
        'recipients.token_id',
        'recipients.operation',
        'recipients.state as status'
      );
  }

  private async updateRecipientById({
    recipient,
    task,
    tokenId,
    state,
  }: {
    recipient: any;
    task: any;
    tokenId: number;
    state: string;
  }) {
    await Recipients.query()
      .update({
        operation: task.details.operation_group_hash,
        state,
      })
      .where('token_id', '=', tokenId)
      .andWhere('address', '=', recipient.recipient)
      .into('recipients');
  }

  public async findRecipients(userId: number): Promise<Recipient[]> {
    if (isEmpty(userId))
      throw new HttpException(400, 'Please provide a valid user id');
    const foundRecipients: Recipient[] = await this.getRecipients(userId);

    const veri_ids = [
      ...new Set(
        foundRecipients.map((recipient: Recipient) => recipient.token_id)
      ),
    ];

    for await (const id of veri_ids) {
      const isAlreadyMinted = foundRecipients.find(
        (recipient) =>
          recipient.token_id === id && recipient.status === 'minted'
      );
      if (isAlreadyMinted) {
        continue;
      }
      try {
        const taskStatus = await axios.get(
          `${PEPPERMINTERY_URL}/tokens/${id}/recipients`
        );

        taskStatus.data.forEach((task: any) => {
          //fix any
          const idx = foundRecipients.findIndex(
            (recipient: any) =>
              recipient.recipient == task.details.recipient_address
          );
          if (task.status.minted) {
            this.updateRecipientById({
              recipient: foundRecipients[idx],
              task,
              tokenId: id,
              state: 'minted',
            });
          } else {
            const isAlreadyMinting = foundRecipients.find(
              (recipient) =>
                recipient.token_id === id && recipient.status === 'minting'
            );
            if (!isAlreadyMinting) {
              this.updateRecipientById({
                recipient: foundRecipients[idx],
                task,
                tokenId: id,
                state: 'minting',
              });
            }
          }
        });
      } catch (e) {
        // throw new HttpException(
        //   500,
        //   'Service unavilable, Please try again later.'
        // );
      }
    }

    return this.getRecipients(userId);
  }

  public async findDuplicate(
    tokenId: number,
    recipients: any
  ): Promise<Recipient[]> {
    return Recipients.query()
      .select()
      .from('recipients')
      .whereIn('recipients.address', recipients)
      .where('recipients.token_id', '=', tokenId);
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

    try {
      const getTaskStatus = await axios.get(
        `${PEPPERMINTERY_URL}/tokens/${tokenId}/recipients`
      );
      getTaskStatus.data.forEach((task: any) => {
        //fix any
        const idx = findRecipient.findIndex(
          (recipient: any) =>
            recipient.recipient == task.details.recipient_address
        );
        if (task.status.minted == 'true') {
          findRecipient[idx].status = 'minted';
        } else {
          findRecipient[idx].status = 'in progress';
        }

        findRecipient[idx].operation = task.details.operation_group_hash;
      });
    } catch (e) {
      // throw new HttpException(
      //   500,
      //   'Service unavilable, Please try again later.'
      // );
    }

    return findRecipient;
  }

  public async createRecipients(
    user_id: number,
    token_id: number,
    addresses: string[]
  ): Promise<Recipient[]> {
    if (addresses.length === 0) {
      throw new HttpException(400, 'Recipient list is empty');
    }
    addresses = [...new Set(addresses)];

    let duplicate_addresses = '';
    const duplicates = await this.findDuplicate(token_id, addresses);
    duplicates.forEach((duplicate) => {
      duplicate_addresses = `${duplicate_addresses} ${duplicate.address}`;
    });
    if (duplicates.length !== 0)
      throw new HttpException(
        500,
        `${duplicate_addresses} has already entered.`
      );

    try {
      await axios.post(
        `${PEPPERMINTERY_URL}/tokens/${token_id}/recipients`,
        addresses,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch {
      throw new HttpException(
        500,
        'Service unavilable, Please try again later.'
      );
    }

    const recipients: Recipient[] = [];
    addresses.forEach((address) => {
      recipients.push({
        token_id,
        address,
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
