export class SmashModel{
    id!:string;
    img!:string;
    name!:string;

    constructor(id : string, 
                img :string, 
                name:string){
        this.id = id;
        this.img = img;
        this.name = name;
    }
}