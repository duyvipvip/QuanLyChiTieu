export interface ITransaction{
    _id?: String;
    time?: String;
    idcategory: String;
    groupcategory: String;
    notetransaction?: String;
    datecreatetransaction: String;
    moneytransaction: String;
    imagecategory:String;
    categorytransaction: String;
    idwallet: String,
    taguser?: Array<String>;
    idwalletold?: String;
    location?: Object;
}