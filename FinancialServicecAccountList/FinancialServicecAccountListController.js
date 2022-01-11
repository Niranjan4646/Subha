({
    Accountcontroller : function(component, event, helper) {
        component.set('v.mycolumns', [
            { label: 'Name', fieldName: 'Name', type: 'string ', sortable: true, editable: true},
            { label: 'Owner Name', fieldName: 'AccountOwner', type: 'string ',sortable: true, editable: true},
            { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true},
            { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'integer', editable: true},
            { label: 'Website', fieldName: 'Website', type: 'string', editable: true}
        ]);
        
        helper.Accounthelpermethod(component);	
    },
    handleSort: function(component, event, helper) {
        var sortBy = event.getParam("fieldName");
        var sortDirection = event.getParam("sortDirection");
        component.set("v.sortBy",sortBy);
        component.set("v.sortDirection",sortDirection);
        helper.sortData(component,sortBy,sortDirection);    
    },
    handleSaveEdition: function (component, event, helper) {
        var draftValues = component.find( "acctTable" ).get( "v.draftValues" );  
        helper.saveEdition(component, draftValues);
    }
})