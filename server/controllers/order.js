import Response from '@utilities/response';
import {Order} from '@models';
import Paystack from 'paystack';
// import { Transaction } from '@models';

class OrderController {
  static async preorder (req, res) {
    try {
      // Verify the transaction Reference here
      const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);
      const { transactionReference } = req.body;
      console.log('transaction: reference.....>>' +transactionReference);
      
      paystack.transaction.verify(transactionReference, async function(err, body) {
        if (err) {
          return Response.error(res, 500, 'Payment cannot be verified')
        }
        const { data } = body;
        if (data.status === 'success') {
          const order = await Order.create(req.body);
          return Response.success(res, 201, 'PreOrder was successful!', order);
        } else {
          return Response.error(res, 500, 'An error has occured');
        }
      });
    } catch (err) {
      Response.error(res, 500, 'Internal server error');
    }
  }
}

export default OrderController;
