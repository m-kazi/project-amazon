import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

//Calling the function at the start of the page
renderCheckoutHeader();

renderOrderSummary();

renderPaymentSummary();
