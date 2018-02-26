let array = [
    {
        "_id": "5a7c6c45fc797616d095f5f6",
        "namewallet": "duy123456",
        "money": 4,
        "__v": 0,
        "transactions": [
            {
                "groupcategory": "income",
                "idwallet": "5a7c6c45fc797616d095f5f6",
                "notetransaction": "thử thêm giao dịch",
                "datecreatetransaction": "2018-02-13T00:00:00.000Z",
                "moneytransaction": "10000",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_award.png",
                "categorytransaction": "award",
                "_id": "5a8309dd2ef36b064c1bfa40",
                "taguser": [
                    "havanduy"
                ]
            },
            {
                "_id": "5a830fd02ef36b064c1bfa41",
                "categorytransaction": "gifts",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_give.png",
                "moneytransaction": "1000",
                "datecreatetransaction": "2018-02-08T00:00:00.000Z",
                "idwallet": "5a7c6c45fc797616d095f5f6",
                "notetransaction": "12",
                "groupcategory": "income",
                "taguser": [
                    "dewd"
                ]
            }
        ]
    },
    {
        "_id": "5a7d4fd5d4f7190a4c37f4cd",
        "namewallet": "Tiền mặt",
        "money": 100000,
        "__v": 0,
        "transactions": [
            {
                "groupcategory": "expense",
                "notetransaction": "test1",
                "datecreatetransaction": "2018-02-11T00:00:00.000Z",
                "moneytransaction": "-123",
                "idwallet": "5a7d4fd5d4f7190a4c37f4cd",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_education.png",
                "categorytransaction": "Education",
                "_id": "5a800f5bfaf4160d4bd90ca4",
                "taguser": [
                    "test1"
                ]
            },
            {
                "groupcategory": "income",
                "idwallet": "5a7d4fd5d4f7190a4c37f4cd",
                "notetransaction": "duyvipvip",
                "datecreatetransaction": "2018-02-12T00:00:00.000Z",
                "moneytransaction": "12000",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_interestmoney.png",
                "categorytransaction": "interest money",
                "_id": "5a817fa62769591eba103fac",
                "taguser": [
                    "homnay"
                ]
            },
            {
                "_id": "5a83004f59273601de2e7fb6",
                "categorytransaction": "Education",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_education.png",
                "moneytransaction": "-123",
                "datecreatetransaction": "2018-02-11T00:00:00.000Z",
                "idwallet": "5a7d4fd5d4f7190a4c37f4cd",
                "notetransaction": "abc",
                "groupcategory": "expense",
                "taguser": [
                    "efc"
                ]
            },
            {
                "_id": "5a83ac874205c5020f57d2bb",
                "categorytransaction": "Education",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_education.png",
                "moneytransaction": "-1000",
                "datecreatetransaction": "2018-02-10T00:00:00.000Z",
                "idwallet": "5a7d4fd5d4f7190a4c37f4cd",
                "notetransaction": "duy",
                "groupcategory": "expense",
                "taguser": [
                    "duy"
                ]
            }
        ]
    },
    {
        "_id": "5a829687d268e801d2ad2407",
        "namewallet": "test1",
        "money": 10000,
        "__v": 0,
        "transactions": [
            {
                "groupcategory": "income",
                "idwallet": "5a829687d268e801d2ad2407",
                "notetransaction": "test1",
                "datecreatetransaction": "2018-02-13T00:00:00.000Z",
                "moneytransaction": "10000",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_interestmoney.png",
                "categorytransaction": "interest money",
                "_id": "5a82b15c349ca2021ffb5525",
                "taguser": [
                    "test1"
                ]
            },
            {
                "_id": "5a8302f659273601de2e7fb7",
                "categorytransaction": "salary",
                "imagecategory": "https://static.moneylover.me/img/icon/ic_category_salary.png",
                "moneytransaction": "456",
                "datecreatetransaction": "2018-02-16T00:00:00.000Z",
                "idwallet": "5a829687d268e801d2ad2407",
                "notetransaction": "test2",
                "groupcategory": "income",
                "taguser": [
                    "test2"
                ]
            }
        ]
    }
];
function groupTransaction(arrTransactionAllWallet){
    let newArrTransactionAllWallet = [];
    arrTransactionAllWallet.forEach((arrTransactionWallet) => {
        arrTransactionWallet.transactions.forEach((transactions) => {
            newArrTransactionAllWallet.push(transactions);
        });
    })
    newArrTransactionAllWallet.sort(function(a,b){
        a = new Date(a.datecreatetransaction);
        b = new Date(b.datecreatetransaction);
        return b - a;
    });
    return formatArrayWalletTransaction(newArrTransactionAllWallet);
}
function formatArrayWalletTransaction(walletTransactions){
     // KHAI BÁO 1 MẢNG RỖNG ĐỂ CHỨA MẢNG SAU KHI GOM NHÓM CÁC GIAO DỊCH XONG
     var newArrWalletTransactions = [];
     // DUYỆT MẢNG CÁC GIAO DỊCH
     walletTransactions.forEach((walletTransaction) => {
         // DÙNG ĐỂ KIỂM TRA NẾU TÌM KIẾM HIẾT CÁC PHẦN TỬ BÊN TRONG MẢNG newArrWalletTransactions
         // MÀ KHÔNG TÌM THẤY GIAO DỊCH CÓ CÙNG NGÀY THÌ LƯU GIAO DỊCH DÓ THÀNH 1 MẢNG BÊN TRONG newArrWalletTransactions
         // NẾU TÌM THẤY THÌ TA LƯU GIAO DỊCH ĐÓ THÀNH 1 ITEM BÊN TRONG MẢNG CHỨC CÁI GIAO DỊCH CÓ CÙNG NGÀY VỚI NÓ
         let check_same = false;
         // DUYỆT CÁC MẢNG BÊN TRONG MẢNG newArrWalletTransactions
         newArrWalletTransactions.forEach((newArrWalletTransaction) => {

             // LẤY NGÀY CỦA GIAO DỊCH CỦA ITEM MẢNG walletTransaction
            let day_walletTransaction = new Date(walletTransaction.datecreatetransaction).getDate();
            let month_walletTransaction = new Date(walletTransaction.datecreatetransaction).getMonth();
            let year_walletTransaction = new Date(walletTransaction.datecreatetransaction).getFullYear();
             
            // LẤY NGÀY CỦA GIAO DỊCH BÊN TRONG MẢNG NẰM TRONG MẢNG newArrWalletTransactions
            let day_newArrWalletTransaction = new Date(newArrWalletTransaction[0].datecreatetransaction).getDate();
            let month_newArrWalletTransaction = new Date(newArrWalletTransaction[0].datecreatetransaction).getMonth();
            let year_newArrWalletTransaction = new Date(newArrWalletTransaction[0].datecreatetransaction).getFullYear();
             
             // SO SÁNH 2 NGÀY DÓ CÓ BÀNG NHAU KHÔNG 
             // NẾU BẰNG NHAU THÌ PUSH VÀO MẢNG newArrWalletTransaction NHƯ 1 ITEM
            if (day_walletTransaction == day_newArrWalletTransaction && month_walletTransaction == month_newArrWalletTransaction && year_walletTransaction == year_newArrWalletTransaction) {
                 newArrWalletTransaction.push(walletTransaction);
                 check_same = true;
             }
         })
          // NẾU DUYẾT HIẾT MÀ VẪN KHÔNG TÌM THẤY NGÀY TRÙNG NHAU
          // THÌ PUSH VÀO MẢNG newArrWalletTransactions NHƯ MỐT ARRAY
         if(check_same == false){
             newArrWalletTransactions.push(new Array(walletTransaction));
         }
        
     })
     return totalTransaction(newArrWalletTransactions);
}
function totalTransaction(arrWalletTransactions){
    let totalAllMoneyIn = 0;
    let totalAllMoneyOut = 0;
    arrWalletTransactions.forEach((arrWalletTransaction) => {
        let totalMoney = 0;
        let dateGroupTransaction = monthGroupTransaction = yearGroupTransaction =  dayGroupTransaction = "";
        let moneyIn = 0;
        let moneyOut = 0;
        arrWalletTransaction.forEach((item) => {
            totalMoney += Number(item.moneytransaction);
            dateGroupTransaction = new Date(item.datecreatetransaction).getDate();
            dayGroupTransaction = new Date(item.datecreatetransaction).getDay();
            monthGroupTransaction = new Date(item.datecreatetransaction).getMonth();
            yearGroupTransaction = new Date(item.datecreatetransaction).getFullYear();
            (item.moneytransaction > 0) ? moneyIn += Number(item.moneytransaction) : moneyOut += Number(item.moneytransaction);
            (item.moneytransaction > 0) ? totalAllMoneyIn += Number(item.moneytransaction) : totalAllMoneyOut += Number(item.moneytransaction);
        })
        arrWalletTransaction.totalMoney = totalMoney;
        arrWalletTransaction.dateGroupTransaction = dateGroupTransaction;
        arrWalletTransaction.dayGroupTransaction = dayGroupTransaction;
        arrWalletTransaction.monthGroupTransaction = monthGroupTransaction;
        arrWalletTransaction.yearGroupTransaction = yearGroupTransaction;
        arrWalletTransaction.moneyIn = moneyIn;
        arrWalletTransaction.moneyOut = moneyOut;
    })
    arrWalletTransactions.totalAllMoneyIn = totalAllMoneyIn;
    arrWalletTransactions.totalAllMoneyOut = totalAllMoneyOut;
    arrWalletTransactions.remain = totalAllMoneyIn + totalAllMoneyOut;
   return arrWalletTransactions;
}
let a = groupTransaction(array);
console.log(a);

/*
    [ [ { groupcategory: 'income',
      idwallet: '5a7c6c45fc797616d095f5f6',
      notetransaction: 'thử thêm giao dịch',
      datecreatetransaction: '2018-02-13T00:00:00.000Z',
      moneytransaction: '10000',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_award.png',
      categorytransaction: 'award',
      _id: '5a8309dd2ef36b064c1bfa40',
      taguser: [Array] },
    { groupcategory: 'income',
      idwallet: '5a829687d268e801d2ad2407',
      notetransaction: 'test1',
      datecreatetransaction: '2018-02-13T00:00:00.000Z',
      moneytransaction: '10000',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_interestmoney.png',
      categorytransaction: 'interest money',
      _id: '5a82b15c349ca2021ffb5525',
      taguser: [Array] },
    totalMoney: 20000,
    dateGroupTransaction: 13,
    dayGroupTransaction: 2,
    monthGroupTransaction: 1,
    yearGroupTransaction: 2018,
    moneyIn: 20000,
    moneyOut: 0 ],
  [ { _id: '5a830fd02ef36b064c1bfa41',
      categorytransaction: 'gifts',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_give.png',
      moneytransaction: '1000',
      datecreatetransaction: '2018-02-08T00:00:00.000Z',
      idwallet: '5a7c6c45fc797616d095f5f6',
      notetransaction: '12',
      groupcategory: 'income',
      taguser: [Array] },
    totalMoney: 1000,
    dateGroupTransaction: 8,
    dayGroupTransaction: 4,
    monthGroupTransaction: 1,
    yearGroupTransaction: 2018,
    moneyIn: 1000,
    moneyOut: 0 ],
  [ { groupcategory: 'expense',
      notetransaction: 'test1',
      datecreatetransaction: '2018-02-11T00:00:00.000Z',
      moneytransaction: '-123',
      idwallet: '5a7d4fd5d4f7190a4c37f4cd',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_education.png',
      categorytransaction: 'Education',
      _id: '5a800f5bfaf4160d4bd90ca4',
      taguser: [Array] },
    { _id: '5a83004f59273601de2e7fb6',
      categorytransaction: 'Education',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_education.png',
      moneytransaction: '-123',
      datecreatetransaction: '2018-02-11T00:00:00.000Z',
      idwallet: '5a7d4fd5d4f7190a4c37f4cd',
      notetransaction: 'abc',
      groupcategory: 'expense',
      taguser: [Array] },
    totalMoney: -246,
    dateGroupTransaction: 11,
    dayGroupTransaction: 0,
    monthGroupTransaction: 1,
    yearGroupTransaction: 2018,
    moneyIn: 0,
    moneyOut: -246 ],
  [ { groupcategory: 'income',
      idwallet: '5a7d4fd5d4f7190a4c37f4cd',
      notetransaction: 'duyvipvip',
      datecreatetransaction: '2018-02-12T00:00:00.000Z',
      moneytransaction: '12000',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_interestmoney.png',
      categorytransaction: 'interest money',
      _id: '5a817fa62769591eba103fac',
      taguser: [Array] },
    totalMoney: 12000,
    dateGroupTransaction: 12,
    dayGroupTransaction: 1,
    monthGroupTransaction: 1,
    yearGroupTransaction: 2018,
    moneyIn: 12000,
    moneyOut: 0 ],
  [ { _id: '5a83ac874205c5020f57d2bb',
      categorytransaction: 'Education',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_education.png',
      moneytransaction: '-1000',
      datecreatetransaction: '2018-02-10T00:00:00.000Z',
      idwallet: '5a7d4fd5d4f7190a4c37f4cd',
      notetransaction: 'duy',
      groupcategory: 'expense',
      taguser: [Array] },
    totalMoney: -1000,
    dateGroupTransaction: 10,
    dayGroupTransaction: 6,
    monthGroupTransaction: 1,
    yearGroupTransaction: 2018,
    moneyIn: 0,
    moneyOut: -1000 ],
  [ { _id: '5a8302f659273601de2e7fb7',
      categorytransaction: 'salary',
      imagecategory: 'https://static.moneylover.me/img/icon/ic_category_salary.png',
      moneytransaction: '456',
      datecreatetransaction: '2018-02-16T00:00:00.000Z',
      idwallet: '5a829687d268e801d2ad2407',
      notetransaction: 'test2',
      groupcategory: 'income',
      taguser: [Array] },
    totalMoney: 456,
    dateGroupTransaction: 16,
    dayGroupTransaction: 5,
    monthGroupTransaction: 1,
    yearGroupTransaction: 2018,
    moneyIn: 456,
    moneyOut: 0 ],
  totalAllMoneyIn: 33456,
  totalAllMoneyOut: -1246,
  remain: 32210 ]
*/