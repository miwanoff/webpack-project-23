import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/style.css";
import "../../css/basket.css";
import "../../css/goods.css";
import basket from "./modules/basket";
import goods from "./modules/goods";


import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import scroll from "./modules/scroll";

window.addEventListener("DOMContentLoaded", function () {
  basket();
  goods();
  scroll();
});
