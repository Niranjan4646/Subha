public class AccountList {
 @AuraEnabled
    public static list<Account> fetchAccountRecords(){
        system.debug('--Inside the APEX');
      return [select Id,Name,Owner.Name,Phone,Website,AnnualRevenue from Account where Industry='Financial Services' ];        
    }
    @AuraEnabled
    public static list<Account> updateAccountRecords(list<Account>accLstToUpdate){
        if(!accLstToUpdate.isEmpty()){
            update accLstToUpdate;
        }
      return fetchAccountRecords();        
    }
}