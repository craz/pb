/*
 
 Product_Auto(obj, retType, debugMode)
 
 1ый параметр
 объект obj{} где:
 obj.profitSource - mercenary\ip\urLic (bool)
 obj.creditSum - Сумма кредита (int)
 obj.creditTerm - Срок кредита (int)
 obj.provision - обеспечение NoProvision\ZalogAuto (text)
 obj.insuranceProperty- страхование имущества (bool)
 obj.insurancePerson - персональная страховка (bool)
 Возвращает размер суммы кредита:
 amountPayment (int) 
 
 2ой параметр(необязательный)
 retType - Тип возвращаемого объекта (bool)
 0: Сумма кредита (int)
 1: Объект: retObj{}  где:
 'productName' - название продукта (int)
 'amountPayment' - сумма кредита (int)
 'percentRate' - процентная ставка (int)
 'monthPayment' - ежемесячный платеж (int)
 
 3ий параметр(необязательный)
 Включение\отключение режима отладки (bool)
 
 */

function Product_CreditForAll(obj, retType, debugMode) {
    retType = retType || 0;         //Тип возвращаемого значения
    debugMode = debugMode || 0;     //Режим отладки
    var productName;                //Название продукта
    var percentRate;                //Процентная ставка
    var amountPayment;              //Сумма кредита
    var monthPayment;               //Месячный платеж
    var noInsuranceProperty = 1;    //Корректировка к отсутствию страхования объекта заемщика 
    var noInsurancePerson = 2;      //Корректировка к отсутствию личного страхования заемщика

    //Определяем базовую процентную ставку 

    /*
     * Кредит "на все" могут получить работники по найму. В описании кредитных продуктов 
     * нихуя не сказано какие работники могут получить кредит Нова-Премиум. 
     * Поэтому все расчеты ведуться по Нова-премиум т.к. там самые низкие 
     * проценты при любых значениях для любых доходов. А
     * для работников по найму рачет ведется по кредиту "на все".
     * 
     **/
    
    //Если нет обеспечения    
    if (obj.provision == 'NoProvision') {
        if (obj.creditSum <= 4000000 && 48 <= obj.creditTerm <= 60) {
            productName = 'Нова Премиум';
            percentRate = 16;
        }
        if (obj.creditSum <= 4000000 && obj.creditTerm <= 36) {
            productName = 'Нова Премиум';
            percentRate = 155e-1;
        }
    }

    //Если обеспечение - залог авто
    if (obj.provision == 'ZalogAuto') {
        if (obj.creditSum <= 4000000 && 48 <= obj.creditTerm <= 84) {
            productName = 'Нова Премиум';
            percentRate = 145e-1;
        }
        if (obj.creditSum <= 4000000 && obj.creditTerm <= 36) {
            productName = 'Нова Премиум';
            percentRate = 14;
        }
        if (obj.creditSum >= 150000 && obj.profitSource == 'mercenary' && obj.creditTerm <= 84) {
            productName = 'На всё';
            percentRate = 16;
            noInsuranceProperty = 2;
            noInsurancePerson = 3;
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
        percentRate = percentRate + noInsuranceProperty;
    }
    if (!obj.insurancePerson) {
        percentRate = percentRate + noInsurancePerson;
    }

    //Считаем сумму кредита
    amountPayment = parseInt(obj.creditSum) + parseInt(obj.creditSum) * (percentRate / 100);
    monthPayment = obj.creditSum / obj.creditTerm;

    //Отладка
    if (debugMode) {
        alert('Продукт: ' + productName + '\nРазмер выплат: ' + amountPayment + '\nСтавка: ' + percentRate + '\nМесячный платеж: ' + monthPayment);
    }

    //Возвращаем параметры кредита
    if (retType) {
        var retObj = {
            'productName': productName,
            'creditSum': amountPayment,
            'percentRate': percentRate,
            'monthPayment': monthPayment
        }
        return retObj;
    } else {
        return amountPayment;
    }
}