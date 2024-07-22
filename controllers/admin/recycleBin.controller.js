const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const moment = require("moment");

const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /admin/recycleBin/
module.exports.index = async (req, res) => {
  const find = {
    deleted: true
  };

  const filterStatus = [
    {
      label: "Tất cả",
      value: ""
    },
    {
      label: "Hoạt động",
      value: "active"
    },
    {
      label: "Dừng hoạt động",
      value: "inactive"
    },
  ];

  if(req.query.status) {
    find.status = req.query.status;
  }

  // Tìm kiếm
  let keyword = "";
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
    keyword = req.query.keyword;
  }
  // Hết Tìm kiếm

  // Phân trang
  const pagination = await paginationHelper(req, find);
  // Hết Phân trang

  const products = await Product
    .find(find)
    .limit(pagination.limitItems)
    .skip(pagination.skip)
    .sort({
      position: "desc"
    });
  for(const item of products){
    if(item.deletedBy){
      const accountDeleted =  await Account.findOne({
        _id: item.deletedBy
      });
      item.deletedByFullName = accountDeleted.fullName;
    } else{
      item.deletedByFullName = "";
    }

    item.deletedAtFormat = moment(item.deletedAt).format("DD/MM/YY HH:mm:ss");

  }

  res.render("admin/pages/recycleBin/index", {
    pageTitle: "Quản lý sản phẩm",
    products: products,
    keyword: keyword,
    filterStatus: filterStatus,
    pagination: pagination
  });
}

// [PATCH] /admin/recycleBin/restore/:id
module.exports.restore = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({
    _id: id
  }, {
    deleted: false
  });

  req.flash('success', "Đã khôi phục sản phẩm");

  res.json({
    code: 200
  });
}


// [DELETE] /admin/recyleBin/permanentlyDelete/:id
module.exports.permanentlyDelete = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({
    _id: id
  });

  req.flash('success', "Đã xóa sản phẩm hoàn toàn");

  res.json({
    code: 200
  });
}

// [PATCH] /admin/recycleBin/change-multi
module.exports.changeMulti = async (req, res) => {
  const {status, ids} = req.body;
  if(status == "active" || status == "inactive"){
    await Product.updateMany({
      _id: ids
    }, {
      status: status
    })
  } else if(status == "restore"){
    await Product.updateMany({
      _id: ids
    }, {
      deleted: false
    })
  } else if(status == "delete"){
    await Product.deleteMany({
      _id: ids
    })
  }

  req.flash('success', "thành công");

  res.json({
    code: 200
  })
}
