export interface ITranslation{
     keyName: string,
     baseString: string,
     translationString: string,
     referenceString?: string,
}

// TODO: Replace with a real data
export const mockupData: ITranslation[] = [
     {
          keyName: "greeting",
          baseString: "Hi",
          translationString: "Բարև"
     },
     {
          keyName: "whatsUp",
          baseString: "What's Up?",
          translationString: "Ինչպե՞ս ես"
     },
     {
          keyName: "bye",
          baseString: "Bye",
          translationString: "Ցտեսություն"
     },
     {
          keyName: "yes",
          baseString: "Yes",
          translationString: "Այո"
     },
     {
          keyName: "no",
          baseString: "No",
          translationString: "Ոչ"
     },
     {
          keyName: "test",
          baseString: "Test",
          translationString: "Test"
     },
     {
          keyName: "no",
          baseString: "No",
          translationString: ""
     },
]