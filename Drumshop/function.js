var cartId = "cart";

var localAdapter = {
  saveCart: function(object) {
    var stringified = JSON.stringify(object);
    localStorage.setItem(cartId, stringified);
    return true;
  },
  getCart: function() {
    return JSON.parse(localStorage.getItem(cartId));
  },
  clearCart: function() {
    localStorage.removeItem(cartId);
  }
};

var ajaxAdapter = {
  saveCart: function(object) {
    var stringified = JSON.stringify(object);
    // do an ajax request here
  },
  getCart: function() {
    // do an ajax request -- recognize user by cookie / ip / session
    return JSON.parse(data);
  },
  clearCart: function() {
    //do an ajax request here
  }
};

var storage = localAdapter;

var helpers = {
  getHtml: function(id) {
    return document.getElementById(id).innerHTML;
  },
  setHtml: function(id, html) {
    document.getElementById(id).innerHTML = html;
    return true;
  },
  itemData: function(object) {
    var count = object.querySelector(".count"),
      patt = new RegExp("^[1-9]([0-9]+)?$");
    count.value = patt.test(count.value) === true ? parseInt(count.value) : 1;

    var item = {
      name: object.getAttribute("data-name"),
      price: object.getAttribute("data-price"),
      id: object.getAttribute("data-id"),
      count: count.value,
      total: parseInt(object.getAttribute("data-price")) * parseInt(count.value)
    };
    return item;
  },
  updateView: function() {
    var items = cart.getItems(),
      template = this.getHtml("cartT"),
      compiled = _.template(template, {
        items: items
      });
    this.setHtml("cartItems", compiled);
    this.updateTotal();
  },
  emptyView: function() {
    this.setHtml("cartItems", "<p>Add some items to see</p>");
    this.updateTotal();
  },
  updateTotal: function() {
    this.setHtml("totalPrice", "R" + cart.total);

    if (cart.total > 0) {
      alert("Your cart total is: R" + cart.total);
    } else {
    }
  }
};

var cart = {
  count: 0,
  total: 0,
  items: [],
  getItems: function() {
    return this.items;
  },
  setItems: function(items) {
    this.items = items;
    for (var i = 0; i < this.items.length; i++) {
      var _item = this.items[i];
      this.total += _item.total;
    }
  },
  clearItems: function() {
    this.items = [];
    this.total = 0;
    storage.clearCart();
    helpers.emptyView();
  },
  addItem: function(item) {
    if (this.containsItem(item.id) === false) {
      this.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        count: item.count,
        total: item.price * item.count
      });

      storage.saveCart(this.items);
    } else {
      this.updateItem(item);
    }
    this.total += item.price * item.count;
    this.count += item.count;
    helpers.updateView();
  },
  containsItem: function(id) {
    if (this.items === undefined) {
      return false;
    }

    for (var i = 0; i < this.items.length; i++) {
      var _item = this.items[i];

      if (id == _item.id) {
        return true;
      }
    }
    return false;
  },
  updateItem: function(object) {
    for (var i = 0; i < this.items.length; i++) {
      var _item = this.items[i];

      if (object.id === _item.id) {
        _item.count = parseInt(object.count) + parseInt(_item.count);
        _item.total = parseInt(object.total) + parseInt(_item.total);
        this.items[i] = _item;
        storage.saveCart(this.items);
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  if (storage.getCart()) {
    cart.setItems(storage.getCart());
    helpers.updateView();
  } else {
    helpers.emptyView();
  }
  var products = document.querySelectorAll(".product button");
  [].forEach.call(products, function(product) {
    product.addEventListener("click", function(e) {
      var item = helpers.itemData(this.parentNode);
      cart.addItem(item);
    });
  });

  document.querySelector("#clear").addEventListener("click", function(e) {
    cart.clearItems();
  });
});

function validate(coupon) {
  var myRe = "50%";
  var coupon = myRe.trim();
  var input = document.getElementById("in").value;
  var newTotal = cart.total / 2;
  if (input.toUpperCase() == coupon.toUpperCase()) {
    document.getElementById("message").innerHTML = "Coupon applied!";
    document.getElementById("err").innerHTML = "";

    return true;
  } else {
    document.getElementById("err").innerHTML = "Invalid coupon";
    document.getElementById("message").innerHTML = "";
    return false;
  }
}

function cartTotalSaved() {
  if (cart.total > 0) {
    document.getElementById("cartTotalSaved").innerHTML = cart.total;
  } else {
  }
}

function cartTotalPostDisc() {
  let discount = document.getElementById("in").value;

  if (discount == "50%") {
    document.getElementById("cartTotalPostDisc").innerHTML = cart.total / 2;
  } else {
    document.getElementById("cartTotalPostDisc").innerHTML = cart.total;
  }
}

function cartTotalPostDiscAndDel() {
  let a = document.getElementById("deliveryOption").value;
  let deliveryFee = Number(50);
  let b = Number(document.getElementById("cartTotalPostDisc").textContent);

  if (a === "none" || a === "collection") {
    document.getElementById("cartTotalPostDiscAndDel").innerHTML = b;
  } else {
    document.getElementById("cartTotalPostDiscAndDel").innerHTML =
      b + deliveryFee;
  }
}

function finalPrice() {
  let z = Number(
    document.getElementById("cartTotalPostDiscAndDel").textContent
  );

  document.getElementById("grandTotalPrice").innerHTML = z;

  if (z > 0) {
    let vat = (z - z / 1.15).toFixed(2);
    document.getElementById("vat").innerHTML = "R" + vat;
  } else if (z == 0) {
    document.getElementById("vat").innerHTML = "-";
  }
}
