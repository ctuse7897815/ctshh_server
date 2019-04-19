//导入所需模块  
var mysql=require("mysql");    
//导入配置文件  
var cfg  =require("../config/db");  
var pool = mysql.createPool({    
    host:      cfg.SQLHOST,  
    user:      cfg.SQLUSER,   
    password:  cfg.SQLPASS,    
    database:  cfg.SQLNAME,
    port:      cfg.SQLPORT
});    
//导出查询相关  
var query=function(sql,successCallback,errorCallback){    
    pool.getConnection(function(err,conn){    
        if(err){    
            errorCallback(err);    
        }else{    
            conn.query(sql,function(qerr,vals,fields){    
                //释放连接    
                conn.release();    
                //事件驱动回调    
                successCallback(qerr,vals,fields);    
            });    
        }    
    });    
};    

module.exports=query;