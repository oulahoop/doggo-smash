export class ChatModel {
//{'content': string, 'owner': boolean}[]
  public doggoId: string
  public content: string;
  public owner: boolean;

  public constructor(doggoId: string, content: string, owner: boolean) {
    this.doggoId = doggoId;
    this.content = content;
    this.owner = owner;
  }

}
