import { Pipe, PipeTransform } from '@angular/core';
import { DONATION_STATE } from '../../donation/model/donation';

@Pipe({
  name: 'donationState'
})
export class DonationStatePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    return DONATION_STATE_TRANSLATION[value];
  }
}
const DONATION_STATE_TRANSLATION: Record<DONATION_STATE, string> = {
  CREATED: 'Pendiente',
  READY_TO_TRAVEL: 'Listo para viajar',
  CANCELLED: 'Cancelado',
  IN_TRAVEL: 'En viaje',
  DONATED_AGAIN: 'Donado nuevamente',
  FINALIZED: 'Finalizado'
}