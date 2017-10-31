var express = require('express');
var router = express.Router();
var url = require('url');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var queryData = url.parse(req.url, true).query;
    var mysql = require('mysql');
    var config = {
        host: 'mysql6001.smarterasp.net',
        user: 'a2b80a_fridge1',
        password: 'shir12345!',
        database: 'db_a2b80a_fridge1',
        multipleStatements: true

    }

    var connection = mysql.createConnection(config);

    connection.connect();




    switch(queryData.function) {
        case "Show":
            //var sql="SELECT * from fridges where fridgeid='" + queryData.fridgeid+"';SELECT * from users";


            //console.log(results[0]);
          //  console.log(results[1]);
          //   var sql= "SELECT actualitems.itemid ,actualvegetables.weight , actualvegetables.purchase , vegetables.expire from ((actualitems INNER JOIN actualvegetables ON   actualitems.fridgeid='" + queryData.fridgeid + "' AND actualitems.fridgeid=actualvegetables.fridgeid AND actualitems.itemid=actualvegetables.itemid)  INNER JOIN vegetables ON actualitems.itemid=vegetables.itemid);"+
    // "  SELECT actualitems.itemid ,actualbarkod.expiredate , actualbarkod.quantity , items.imagepath from (((actualitems"+
    //      "  INNER JOIN actualbarkod ON actualitems.fridgeid='66352618_D' AND  actualitems.fridgeid=actualbarkod.fridgeid AND actualitems.itemid=actualbarkod.itemid)"+
    //     " INNER JOIN barkods ON actualitems.itemid=barkods.itemid)"+
    //       " INNER JOIN items ON actualitems.itemid=items.itemid); SELECT actualitems.itemid ,actualvegetables.weight , actualvegetables.purchase , vegetables.expire from ((actualitems INNER JOIN actualvegetables ON   actualitems.fridgeid='" + queryData.fridgeid + "' AND actualitems.fridgeid=actualvegetables.fridgeid AND actualitems.itemid=actualvegetables.itemid)  INNER JOIN vegetables ON actualitems.iteactualitems.itemid=vegetables.itemid);" ;
    //       //     , function(error, results, fields) {
    //       //       if (error) {
          //           throw error;
          //       }


            var sql = "SELECT   actualitems.type , actualitems.itemid ,actualvegetables.weight , actualvegetables.purchase , vegetables.expire , items.imagepath from (((actualitems INNER JOIN actualvegetables ON  actualitems.fridgeid='" + queryData.fridgeid +"' AND actualitems.fridgeid = actualvegetables.fridgeid AND actualitems.itemid = actualvegetables.itemid ) INNER JOIN vegetables ON actualitems.itemid = vegetables.itemid ) INNER JOIN items ON actualitems.itemid=items.itemid );  SELECT actualitems.type ,  actualitems.itemid ,actualbarkod.expiredate , actualbarkod.quantity , items.imagepath from (((actualitems INNER JOIN actualbarkod ON actualitems.fridgeid='" + queryData.fridgeid +"' AND  actualitems.fridgeid=actualbarkod.fridgeid AND actualitems.itemid=actualbarkod.itemid) INNER JOIN barkods ON actualitems.itemid=barkods.itemid) INNER JOIN items ON actualitems.itemid=items.itemid)";
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

    }
    connection.end();
});





module.exports = router;
