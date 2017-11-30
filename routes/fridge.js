var express = require('express');
var router = express.Router();
var url = require('url');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var queryData = url.parse(req.url, true).query;
    var mysql = require('mysql');
    var config = {
        host: 'mysql6001.site4now.net',
        user: 'a2f077_fridge1',
        password: 'login12345',
        database: 'db_a2f077_fridge1',
        multipleStatements: true

    }

    var connection = mysql.createConnection(config);

    connection.connect();




    switch(queryData.function) {
        case "Show":
          


            var sql = "SELECT   actualitems.type , actualitems.itemid ,actualvegetables.weight , actualvegetables.purchase , vegetables.expire , items.imagepath ,items.name from (((actualitems INNER JOIN actualvegetables ON  actualitems.fridgeid='" + queryData.fridgeid +"' AND actualitems.fridgeid = actualvegetables.fridgeid AND actualitems.itemid = actualvegetables.itemid ) INNER JOIN vegetables ON actualitems.itemid = vegetables.itemid ) INNER JOIN items ON actualitems.itemid=items.itemid );  SELECT actualitems.type ,  actualitems.itemid ,actualbarkod.expiredate , actualbarkod.quantity , items.imagepath ,items.name from (((actualitems INNER JOIN actualbarkod ON actualitems.fridgeid='" + queryData.fridgeid +"' AND  actualitems.fridgeid=actualbarkod.fridgeid AND actualitems.itemid=actualbarkod.itemid) INNER JOIN barkods ON actualitems.itemid=barkods.itemid) INNER JOIN items ON actualitems.itemid=items.itemid)";
               // "SELECT actualitems.itemid ,actualbarkod.expiredate , actualbarkod.quantity , items.imagepathfrom (((actualitems INNER JOIN actualbarkod ON  actualitems.fridgeid='66352618_D' AND  actualitems.fridgeid=actualbarkod.fridgeid AND actualitems.itemid = actualbarkod.itemid ) INNER JOIN barkods ON actualitems.itemid=barkods.itemid) INNER JOIN items ON actualitems.itemid=items.itemid);";

            connection.query(sql,[2,1],function(error, results, fields) {
                if (error) {
                    throw error;
                }
                   var h={msg: results  };

                    res.send(h); 
                });

            //"SELECT actualitems.itemid ,actualvegetables.weight , actualvegetables.purchase , vegetables.expire from ((actualitems INNER JOIN actualvegetables ON   actualitems.fridgeid='" + queryData.fridgeid + "' AND actualitems.fridgeid=actualvegetables.fridgeid AND actualitems.itemid=actualvegetables.itemid)  INNER JOIN vegetables ON actualitems.iteactualitems.itemid=vegetables.itemid); " +

            break;
        case "AddBarcode":

            connection.query("INSERT INTO actualitems (fridgeid,itemid,type) VALUES('"+ queryData.fridgeid +"', '"+ queryData.itemid +"','barkod') ON DUPLICATE KEY UPDATE type='barkod' ;INSERT INTO  actualbarkod (fridgeid, itemid,expiredate,quantity) VALUES('"+ queryData.fridgeid +"', '"+ queryData.itemid +"','"+ queryData.expiredate +"', "+1+") ON DUPLICATE KEY UPDATE quantity = quantity + 1 , expiredate = CONCAT (expiredate ,' "+queryData.expiredate+"') ",
                function (err,rows1,fields1) {
                    if(!err){
                        var  Register= {msg: 'item added'}
                        res.send(Register);

                    }

                    else{
                        var error = {msg: 'item added'}
                        res.send(error);
                    }

                });

            break;



case "AddVegetables":
    connection.query("INSERT INTO actualitems (fridgeid,itemid,type) VALUES ('"+ queryData.fridgeid +"', '" + queryData.itemid +"','vegetables') ON DUPLICATE KEY UPDATE type='vegetables';INSERT INTO  actualvegetables (fridgeid, itemid,weight,purchase) VALUES ('"+
        queryData.fridgeid +"', '"+ queryData.itemid+"',"+ queryData.weight +",' "+queryData.weight+" "+queryData.purchase+"') ON DUPLICATE KEY UPDATE  weight = weight + "+queryData.weight+" , purchase = CONCAT (purchase ,' "+queryData.weight+" "+queryData.purchase+"')",
function (err,rows2,fields2) {
    if(!err){
        var  Register= {msg: 'vegetable added'}
        res.send(Register);

    }

    else{
        var error = {msg: 'vegetable added'}
        res.send(error);
    }

});

    break;
  //  UPDATE actualbarkod SET purchase='200 6.12.2017 250 23.12.2017', weight=450 WHERE itemid='tomatoes'AND fridgeid='66352618_D'

        case "RemoveItemVegetables":

            connection.query("UPDATE actualvegetables SET purchase='"+queryData.purchase+"', weight='"+queryData.weight+"' WHERE itemid='"+queryData.itemid+"'AND fridgeid='"+queryData.fridgeid+"';UPDATE  actualitems ai, actualvegetables ab SET ai.type = 'delete' WHERE ai.fridgeid= ab.fridgeid AND ai.itemid=ab.itemid AND ab.weight=0; DELETE FROM actualvegetables WHERE actualvegetables.weight=0  ; DELETE FROM actualitems WHERE actualitems.type='delete';",
                function (err,rows1,fields1) {
                    if(!err){
                        var  Register= {msg: 'item removed'}
                        res.send(Register);

                    }

                    else{
                        var error = {msg: 'item removed'}
                        res.send(error);
                    }

                });
            break;


        case "RemoveItemBarcode":

        connection.query("UPDATE actualbarkod SET expiredate='"+queryData.expiredate+"', quantity=quantity-1 WHERE itemid='"+queryData.itemid+"'AND fridgeid='"+queryData.fridgeid+"'; UPDATE  actualitems ai, actualbarkod ab SET ai.type = 'delete' WHERE ai.fridgeid= ab.fridgeid AND ai.itemid=ab.itemid AND ab.quantity=0 ;DELETE FROM actualbarkod WHERE actualbarkod.quantity=0  ; DELETE FROM actualitems WHERE actualitems.type='delete';",
            function (err,rows1,fields1) {
                if(!err){
                    var  Register= {msg: 'item removed'}
                    res.send(Register);

                }

                else{
                    var error = {msg: 'item removed'}
                    res.send(error);
                }

            });
           break;
        case "getvegetablesList":
        connection.query("SELECT  itemid  from vegetables ",
            function (err,rows1,fields1) {
            if(!err) {
                var list = {msg: rows1}
                res.send(list);
            }
            else{
                    var error = {msg: 'Error'}
                    res.send(error);
                }

    });
        break;
    }
    connection.end();
});





module.exports = router;
