class CurrencyClass {
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }
}

const Currency = {
    usd:new CurrencyClass(0,"USD"),
    eur: new CurrencyClass(1,"EUR"),
    gbp:new CurrencyClass(2,"GBP"),
    czk:new CurrencyClass(3,"CZK"),
}

module.exports = {
    Currency
}


