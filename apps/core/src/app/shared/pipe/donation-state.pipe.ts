import { Pipe, PipeTransform } from '@angular/core';
import { DONATION_STATE } from '../../donation/model/donation';

@Pipe({
  name: 'donationState'
})
export class DonationStatePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return DONATION_STATE_TRANSLATION[value];
  }
}
const DONATION_STATE_TRANSLATION: Record<DONATION_STATE, string> = {
  CREATED: 'Pendiente',
  READY_TO_TRAVEL: 'Listo para viajar',
  PENDING_TO_COLLECT: 'Pendiente de recolectar',
  CANCELLED: 'Cancelado',
  IN_TRAVEL: 'En viaje',
  DONATED_AGAIN: 'Donado nuevamente',
  FINALIZED: 'Finalizado'
}