import { CreditsModule } from './credits.module';

describe('CreditsModule', () => {
  let creditsModule: CreditsModule;

  beforeEach(() => {
    creditsModule = new CreditsModule();
  });

  it('should create an instance', () => {
    expect(creditsModule).toBeTruthy();
  });
});
