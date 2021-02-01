import { DonationStatePipe } from './donation-state.pipe';

describe('DonationStatePipe', () => {
  it('create an instance', () => {
    const pipe = new DonationStatePipe();
    expect(pipe).toBeTruthy();
  });
});
