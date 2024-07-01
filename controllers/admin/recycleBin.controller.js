const Product = require("../../models/product.model");

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

  // console.log(products);

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
  res.json({
    code: 200
  })
}

console.log(module);