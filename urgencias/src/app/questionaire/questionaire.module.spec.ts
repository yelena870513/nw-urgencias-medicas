import { QuestionaireModule } from './questionaire.module';

describe('QuestionaireModule', () => {
  let questionaireModule: QuestionaireModule;

  beforeEach(() => {
    questionaireModule = new QuestionaireModule();
  });

  it('should create an instance', () => {
    expect(questionaireModule).toBeTruthy();
  });
});
