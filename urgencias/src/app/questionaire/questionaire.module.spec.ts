import { QuestionaireModule } from './questionaire.module';

//noinspection TypeScriptUnresolvedFunction
describe('QuestionaireModule', () => {
  let questionaireModule: QuestionaireModule;

  //noinspection TypeScriptUnresolvedFunction
  beforeEach(() => {
    questionaireModule = new QuestionaireModule();
  });

  //noinspection TypeScriptUnresolvedFunction
  it('should create an instance', () => {
    //noinspection TypeScriptUnresolvedFunction
    expect(questionaireModule).toBeTruthy();
  });
});
