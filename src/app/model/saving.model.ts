export interface ISaving {
    _id?: String;
    namesaving: String;
    idwallet: String;
    moneyend: Number;
    enddate?: String;
    image: String;
    percent?:Number;
    dateRemain?:Number;
    status?:String;
    moneyTransaction?:Number;
    arrTransaction?:Array<any>;
    remainMoney?: Number;
    // ngày còn lại
    day?:String;
}
