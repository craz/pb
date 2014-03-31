/*
 
 Product_Auto(obj, retType, debugMode)
 
 1ый параметр
 объект obj{} где:
 obj.newCar - Машина новая\старая (bool)
 obj.typeCar - Тип машины commercial\light (text)
 obj.priceCar - Цена машины (int)
 obj.firstDeposit - Первоначальный взнос(int)
 obj.creditTerm - Срок кредита (int)
 obj.insuranceCar - Страховка машины (bool)
 obj.insurancePerson - Персональная страховка (bool)
 Возвращает размер суммы кредита:
 creditSum (int) 
 
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

function Product_Auto(obj, retType, debugMode) {
    retType = retType || 0;         //Тип возвращаемого значения
    debugMode = debugMode || 0;     //Режим отладки
    var percentDeposit;             //Процент первоначального взноса от общей суммы
    var productName;                //Название продукта
    var percentRate;                //Процентная ставка
    var creditSum;                  //Сумма кредита
    var monthPayment;               //Месячный платеж
    var noInsuranceCar = 1;         //Корректировка к отсутствию страхования объекта заемщика 
    var noInsurancePerson = 2;      //Корректировка к отсутствию личного страхования заемщика

    //Считаем процент взноса
    percentDeposit = 100 * (obj.firstDeposit / obj.priceCar);

    //Определяем базовую процентную ставку 

    //Новое легковое авто менее 1.5млн
    if (obj.newCar && obj.typeCar == "light" && obj.priceCar < 15e5 && obj.creditTerm <= 60) {
        productName = 'Авто-СТАНДАРТ';
        if (percentDeposit >= 70) {
            percentRate = 135e-1;
        } else if (30 <= percentDeposit < 70) {
            percentRate = 15;
        } else if (15 <= percentDeposit < 30) {
            percentRate = 185e-1;
        }
    }

    //Новое легковое авто более 1.5 млн
    if (obj.newCar && obj.typeCar == "light" && obj.priceCar >= 15e5 && obj.creditTerm <= 119) {
        productName = 'Авто-ПРЕМИУМ';
        if (percentDeposit >= 70) {
            percentRate = 12;
        } else if (30 <= percentDeposit < 70) {
            percentRate = 135e-1;
        }
    }

    //Коммерческое авто
    if (obj.typeCar == "commercial" && obj.creditTerm <= 119) {
        productName = 'Коммерческий транспорт';
        if (percentDeposit >= 70) {
            percentRate = 13;
        } else if (30 <= percentDeposit < 70) {
            percentRate = 15;
        } else if (15 <= percentDeposit < 30) {
            percentRate = 17;
        }
        //Корректировки
        if (!obj.newCar) {
            percentRate = percentRate + 3;
        }
    }

    //Подержанное авто  
    if (!obj.NewCar && obj.typeCar == "light" && obj.creditTerm <= 60) {
        productName = 'Авто c пробегом';
        if (percentDeposit >= 70) {
            percentRate = 135e-1;
        } else if (30 <= percentDeposit <= 70) {
            percentRate = 15;
        } else if (15 <= percentDeposit <= 30) {
            percentRate = 185e-1;
        }
    }

    //Возвращаем False если подходящего кредита не найдено
    if (!productName) {
        if (debugMode) {
            alert('No product detected!');
        }
        return false;
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

