let array = [
    {
        "groupcategory" : "income",
        "notetransaction" : "test2",
        "datecreatetransaction" : "2018-02-16T00:00:00.000Z",
        "moneytransaction" : "456",
        "imagecategory" : "https://static.moneylover.me/img/icon/ic_category_salary.png",
        "categorytransaction" : "salary",
        "_id" : "5a800f7cfaf4160d4bd90ca5",
        "taguser" : [ 
            "test2"
        ]
    },
    {
        "groupcategory" : "expense",
        "notetransaction" : "dwdw",
        "datecreatetransaction" : "2018-02-11T16:38:45.000Z",
        "moneytransaction" : "-123",
        "imagecategory" : "https://static.moneylover.me/img/icon/ic_category_education.png",
        "categorytransaction" : "Education",
        "_id" : "5a800f3afaf4160d4bd90ca3",
        "taguser" : [ 
            "efc"
        ]
    }, 
    {
        "groupcategory" : "expense",
        "notetransaction" : "test1",
        "datecreatetransaction" : "2018-02-11T16:38:45.000Z",
        "moneytransaction" : "123",
        "imagecategory" : "https://static.moneylover.me/img/icon/ic_category_education.png",
        "categorytransaction" : "Education",
        "_id" : "5a800f5bfaf4160d4bd90ca4",
        "taguser" : [ 
            "test1"
        ]
    }
];
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
let a = formatArrayWalletTransaction(array);
console.log(a);