const mysql = require('mysql');
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 50
});
//show pót lên table
exports.view = (req, res) => {

  connection.query('SELECT * FROM products WHERE lockPr = "1" OR lockPr = "2" OR lockPr = "0" ', (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM products WHERE lockPr = "3" ', (err, rows1) => {
        if (!err) {
          let removedUser = req.query.removed;
          res.render('post-page', { rows, rows1, removedUser });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });

}

// show data pót
exports.edit = (req, res) => {
  connection.query('SELECT * FROM products WHERE productId = ?', [req.params.productId], (err, rows) => {
    if (!err) {
      res.render('post-lock', { rows });
    } else {
      console.log(err);
    }
  });
}
// lock post
exports.update = (req, res) => {
  connection.query('UPDATE products SET lockPr = "3" WHERE productId  = ?', [req.params.productId], (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM products WHERE productId = ?', [req.params.productId], (err, rows) => {
        if (!err) {
          res.render('post-lock', { alert: `Khóa tin thành công vui lòng trở lại trang chủ` });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}
//lockout cho post
exports.lockoutPost = (req, res) => {
  connection.query('UPDATE products SET lockPr = "0" WHERE productId   = ?', [req.params.productId], (err, rows) => {
    if (!err) {
      res.redirect('/api/controllers/post-page');
    } else {
      console.log(err);
    }
  });
}
//delete post
exports.delete = (req, res) => {
  connection.query('DELETE FROM products WHERE productId = ?', [req.params.productId], (err, rows) => {

    if (!err) {
      res.redirect('/api/controllers/post-page');
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);

  });
}
//-------------page user-----------------


exports.viewUser = (req, res) => {

  connection.query('SELECT * FROM users', (err, rows) => {

    if (!err) {
      let removedUser = req.query.removed;
      res.render('user-management', { rows, removedUser });
    } else {
      console.log(err);
    }
    // console.log('The data from user table: \n', rows);
  });
}
//  lock user
exports.lockUser = (req, res) => {
  connection.query('UPDATE users SET status = "lock" WHERE idUser   = ?', [req.params.idUser], (err, rows) => {

    if (!err) {
      res.redirect('/api/controllers/user-mng');
    } else {
      console.log(err);
    }
  });
}
// Update lock user
exports.lockoutUser = (req, res) => {
  connection.query('UPDATE users SET status = "active" WHERE idUser   = ?', [req.params.idUser], (err, rows) => {

    if (!err) {
      res.redirect('/api/controllers/user-mng');
    } else {
      console.log(err);
    }
  });
}