// Переводит простое число в валютное значение (добавляет знак $)
// используется как formatter.format(number)

export const  formatToUSD = new Intl.NumberFormat(
        "en-US", {
            style: "currency",
            currency: "USD"
          }
    );
//  в TransactionTable.tsx - formatter.format(number)