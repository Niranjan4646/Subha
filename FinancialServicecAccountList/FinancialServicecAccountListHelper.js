({
    Accounthelpermethod:function(component,event,helper){
        var action = component.get("c.fetchAccountRecords");
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var accList = response.getReturnValue();
                accList.forEach(function(acc){
                    try{
                        acc['AccountOwner'] = acc.Owner.Name; /* You can adjust the field name here. So here basically we are populating the nested property on the main object. */
                        console.log('--acc--'+acc);
                    }catch(e){}
                });
                component.set("v.mydata", accList);
            }
        });
        $A.enqueueAction(action);
    },
    sortData : function(component,fieldName,sortDirection){
        var data = component.get("v.mydata");
        //function to return the value stored in the field
        var key = function(a) { return a[fieldName]; }
        var reverse = sortDirection == 'asc' ? 1: -1;
        
        // to handel number/currency type fields 
        if(fieldName == 'AnnualRevenue'){ 
            data.sort(function(a,b){
                var a = key(a) ? key(a) : '';
                var b = key(b) ? key(b) : '';
                return reverse * ((a>b) - (b>a));
            }); 
        }
        else{// to handel text type fields 
            data.sort(function(a,b){ 
                var a = key(a) ? key(a).toLowerCase() : '';//To handle null values , uppercase records during sorting
                var b = key(b) ? key(b).toLowerCase() : '';
                return reverse * ((a>b) - (b>a));
            });    
        }
        //set sorted data to accountData attribute
        component.set("v.mydata",data);
    },
    saveEdition: function (component, draftValues) {
        var action = component.get("c.updateAccountRecords");
        action.setParams({ accLstToUpdate : draftValues});
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var accList = response.getReturnValue();
                accList.forEach(function(acc){
                    try{
                        acc['AccountOwner'] = acc.Owner.Name; /* You can adjust the field name here. So here basically we are populating the nested property on the main object. */
                        console.log('--acc--'+acc);
                    }catch(e){}
                });
                component.set("v.mydata", accList);
                component.set("v.draftValues", []);
            }
        });
        $A.enqueueAction(action);    
    }
})