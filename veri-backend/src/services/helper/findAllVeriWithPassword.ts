import { Veri } from '@interfaces/veris.interface';
import { Veris } from '@models/veris.model';

export default async function findAllVeriWithPassword() {
  const allVeris: Veri[] = await Veris.query()
    .from('veris')
    .join('files', 'files.id', '=', 'veris.thumb_id')
    .select(
      'veris.id',
      'files.path as thumbnail',
      'veris.event_name as veri',
      'veris.organizer',
      'veris.event_start_date',
      'veris.event_end_date',
      'veris.status',
      'veris.live_distribution',
      'veris.live_distribution_url',
      'veris.live_distribution_password'
    );
  return allVeris;
}
