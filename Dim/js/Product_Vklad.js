/*
 
 Product_Auto(obj, retType, debugMode)
 
 1ый параметр
 объект obj{} где:
 obj.currency - Валюта вклада rubl\evro\dollar (text)
 obj.vkladSum - Сумма вклада (int)
 obj.typeAccrual - Тип начисления процентов vklad\card (text)
 obj.vkladTerm - Срок вклада (int)
 obj.debitTransactions - Расходные операции по вкладу (bool)
 
 Возвращает размер суммы вклада:
 vkladSum (int) 
 
 2ой параметр(необязательный)
 retType - Тип возвращаемого объекта (bool)
 0: Сумма кредита (int)
 1: Объект: retObj{}  где:
 'productName' - название продукта (int)
 'creditSum' - сумма кредита (int)
 'percentRate' - процентная ставка (int)
 'monthPay' - ежемесячный платеж (int)
 
 3ий параметр(необязательный)
 Включение\отключение режима отладки (bool)
 
 */

function Product_Vklad(obj, retType, debugMode) {
    retType = retType || 0;         //Тип возвращаемого значения
    debugMode = debugMode || 0;     //Режим отладки
    var percentDeposit;             //Процент первоначального взноса от общей суммы
    var productName;                //Название продукта
    var percentRate;                //Процентная ставка
    var creditSum;                  //Сумма кредита
    var monthPayment;               //Месячный платеж
    var noInsuranceCar = 1;         //Корректировка к отсутствию страхования объекта заемщика 
    var noInsurancePerson = 2;      //Корректировка к отсутствию личного страхования заемщика

    //Определяем базовую процентную ставку 

    if (obj.currency == 'rubl' && obj.vkladSum=> 30000 && (181 => obj.vkladTerm || 730 <= obj.vkladTerm)) {
        if (obj.vkladTerm <= 91) {
            productName = 'Оптимальный';
            percentRate = 85e-1;
        }
        if (91 <= obj.vkladTerm <= 181) {
            productName = 'Оптимальный';
            percentRate = 9;
        }
        if (obj.vkladTerm >= 730) {
            productName = 'Первобанк';
            percentRate = 95e-1;
        }
    } else {
        productName = 'Коктейль';
        if (31 <= obj.vkladTerm <= 90) {
            if (obj.currency == 'rubl') {
                percentRate = 6;
            } else {
                percentRate = 16e-1;
            }
        }
        if (91 <= obj.vkladTerm <= 180) {
            if (obj.currency == 'rubl') {
                percentRate = 75e-1;
            } else {
                percentRate = 2;
            }
        }
        if (181 <= obj.vkladTerm <= 269) {
            if (obj.currency == 'rubl') {
                percentRate = 85e-1;
            } else {
                percentRate = 325e-2;
            }
        }
        if (270 <= obj.vkladTerm <= 369) {
            if (obj.currency == 'rubl') {
                percentRate = 9;
            } else {
                percentRate = 35e-1;
            }
        }
        if (370 <= obj.vkladTerm <= 554) {
            if (obj.currency == 'rubl') {
                percentRate = 925e-2;
            } else {
                percentRate = 4;
            }
        }
        if (555 <= obj.vkladTerm <= 729) {
            if (obj.currency == 'rubl') {
                percentRate = 925e-2;
            } else {
                percentRate = 425e-2;
            }
        }

    }

    //Корректировки
    if (!obj.insuranceProperty) {
        percentRate = percentRate + noInsuranceCar;
    }
    if (!obj.insurancePerson) {
        percentRate = percentRate + noInsurancePerson;
    }

    //Считаем сумму кредита
    creditSum = obj.priceCar - obj.firstDeposit;
    creditSum = creditSum + creditSum * (percentRate / 100);
    monthPayment = creditSum / obj.creditTerm

    //Отладка
    if (debugMode) {
        alert('Продукт: ' + productName + '\nСумма кредита:' + creditSum + '\nСтавка: ' + percentRate + '\nМесячный платеж: ' + monthPayment);
    }
    //Возвращаем параметры кредита
    if (retType) {
        var retObj = {
            'productName': productName,
            'creditSum': creditSum,
            'percentRate': percentRate,
            'monthPay': creditSum / obj.creditTerm
        }
        return retObj;
    } else {
        return creditSum;
    }
}

