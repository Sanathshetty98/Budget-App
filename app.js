var budgetController = ( function() {
    var Expense = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals : {
            exp: 0,
            inc: 0
        }
    };
    return {
        addItem: function(type, des, val)
        {
            var newItem, ID;
            if(data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else{
                ID = 0;
            }
            if(type==='exp')
            {
                newItem = new Expense(ID, des, val);
            }
            else if(type==='inc')
            {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function(){
            console.log(data);
        }
    };
})();

var UIController = ( function () 
{
    var DOMString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }
    return{
        getInput: function()
        {
            return{
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            };
        },
        addListElement: function(obj, type)
        {
            var html,newHtml,element;
            if(type === 'inc'){
                element = DOMString.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type === 'exp'){
                element = DOMString.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }    
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        clearFields: function()
        {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        getDomString: function(){
            return DOMString;
        }
    };
})();

var controller = ( function(budgetCrtl, UICtrl) {
        var setupEventListeners = function()
        {
            var DOM = UICtrl.getDomString();
            document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 
            document.addEventListener( 'keypress', function(event){
            if( event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
            })
        }

        var updatedBudget = function()
        {
            //Budget
        }

        var ctrlAddItem = function() 
        {
            var input, newItem;

            input = UICtrl.getInput();

            if(input.description !== "" && !isNaN(input.value) && input.value>0){
                newItem = budgetCrtl.addItem(input.type, input.description, input.value);

                UICtrl.addListElement(newItem, input.type);

                UICtrl.clearFields();

                updatedBudget();

            }
            
        }
        return {
            init: function(){
                console.log('Application has started');
                setupEventListeners();
            }
        };

})(budgetController, UIController);

controller.init();
