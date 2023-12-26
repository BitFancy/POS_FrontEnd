import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Table from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Tabletop from '../../EntryFile/tabletop';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Eye1,
  Calendar,
  Printer,
  search_whites,
  Search,
  PlusIcon,
  EditIcon,
  Dollar1,
  plusCircle,
  Download,
  delete1,
  DeleteIcon,
  datepicker,
} from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import api from '../../utils/api';
import ReactToPrint from 'react-to-print';

const SalesList = (props) => {
  const ref = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const [customerName, setCustomerName] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [payMethod, setPayMethod] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);

  const [orderList, setOrderList] = useState([]);

  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const confirmText = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ml-1',
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          confirmButtonClass: 'btn btn-success',
        });
    });
  };
  const options = [
    { id: 1, text: 'Completed', text: 'Completed' },
    { id: 2, text: 'Paid', text: 'Paid' },
  ];
  const options1 = [
    { id: 1, text: 'Cash', text: 'Cash' },
    { id: 2, text: 'Online', text: 'Online' },
    { id: 3, text: 'Inprogess', text: 'Inprogess' },
  ];

  const columns = [
    {
      title: 'Costumer name',
      dataIndex: 'customer',
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <>
          {text === 'New' && <span className="badges bg-lightred">{text}</span>}
          {text === 'In Progress' && (
            <span className="badges bg-lightgreen">{text}</span>
          )}
          {text === 'Completed' && (
            <span className="badges bg-lightred">{text}</span>
          )}
          {text === 'Cancelled' && (
            <span className="badges bg-lightred">{text}</span>
          )}
          {text === 'Refunded' && (
            <span className="badges bg-lightred">{text}</span>
          )}
          {text === 'Hold On' && (
            <span className="badges bg-lightred">{text}</span>
          )}
        </>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Pay Method',
      dataIndex: 'paymethod',
      render: (text, record) => (
        <>
          {text === 'Cash' && (
            <span className="badges bg-lightgreen">{text}</span>
          )}
          {text === 'Debit' && (
            <span className="badges bg-lightred">{text}</span>
          )}
          {text === 'Scan' && (
            <span className="badges bg-lightred">{text}</span>
          )}
        </>
      ),
      sorter: (a, b) => a.paymethod.length - b.paymethod.length,
    },
    // {
    //   title: 'Payment',
    //   dataIndex: 'Payment',
    //   render: (text, record) => (
    //     <>
    //       {text === 'Paid' && (
    //         <span className="badges bg-lightgreen">{text}</span>
    //       )}
    //       {text === 'Due' && <span className="badges bg-lightred">{text}</span>}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Payment.length - b.Payment.length,
    // },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'Paid',
    //   render: (text, record) => (
    //     <>
    //       {text === 100 && <div className="text-green">{text}</div>}
    //       {text === 0 && <div>{text}</div>}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Paid.length - b.Paid.length,
    // },
    // {
    //   title: 'Due',
    //   dataIndex: 'Due',
    //   render: (text, record) => (
    //     <>
    //       {text === 100 && <div className="text-red">{text}</div>}
    //       {text === 0 && <div>{text}</div>}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Due.length - b.Due.length,
    // },
    {
      title: 'Action',
      render: (text, record) => (
        <>
          <div>
            <Link>
              <img src={Eye1} className="me-2" alt="img" />
            </Link>
            <Link>
              <img src={EditIcon} className="me-2" alt="img" />
            </Link>
            <ReactToPrint
              bodyClass="print-agreement"
              content={() => ref.current}
              trigger={() => (
                <Link>
                  <img src={Printer} className="me-2" alt="img" />
                </Link>
              )}
            />
            <Link>
              <img src={DeleteIcon} className="me-2" alt="img" />
            </Link>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      await api.get('/order').then(async (res) => {
        const customers = [];
        const ordersWithCustomers = await Promise.all(
          res.data.map(async (order) => {
            const customer = await api.get(`/customer/${order.customer}`);
            customers.push(customer.data.customerName);
            order.customer = customer.data.customerName;
            order.createdAt = new Date(order.createdAt).toDateString();
            return order;
          })
        );
        setCustomerName(customers);
        setOrderList(ordersWithCustomers);
      });
    })();
  }, []);

  useEffect(() => {
    console.log(customerName, 'This is customer name list');
  }, [customerName]);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Orders List</h4>
              <h6>Manage your Orders</h6>
            </div>
            <div className="page-btn">
              <Link to="/dream-pos/sales/add-sales" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                Make Order
              </Link>
            </div>
            <div className="fixed inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                Open dialog
              </button>
            </div>
          </div>
          {/* /product list */}
          <div className="card" ref={ref}>
            <div className="card-body align-items-center justify-center">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
                id="filter_inputs"
                style={{ display: inputfilter ? 'block' : 'none' }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Name" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Reference No" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: 'Choose Suppliers',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <Link to="#" className="btn btn-filters ms-auto">
                          <img src={search_whites} alt="img" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table props={props} columns={columns} dataSource={orderList} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <>
        <div
          className="modal fade"
          id="showpayment"
          tabIndex={-1}
          aria-labelledby="showpayment"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Show Payments</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Reference</th>
                        <th>Amount </th>
                        <th>Paid By </th>
                        <th>Paid By </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bor-b1">
                        <td>2022-03-07 </td>
                        <td>INV/SL0101</td>
                        <td>$ 0.00 </td>
                        <td>Cash</td>
                        <td>
                          <Link className="me-2" to="#">
                            <img src={Printer} alt="img" />
                          </Link>
                          <Link
                            className="me-2"
                            to="#"
                            data-bs-target="#editpayment"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                          >
                            <img src={EditIcon} alt="img" />
                          </Link>
                          <Link className="me-2 confirm-text" to="#">
                            <img src={DeleteIcon} alt="img" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* show payment Modal */}
        {/* show payment Modal */}
        <div
          className="modal fade"
          id="createpayment"
          tabIndex={-1}
          aria-labelledby="createpayment"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Customer</label>
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Reference</label>
                      <input type="text" defaultValue="INV/SL0101" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Received Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Paying Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Payment type</label>
                      <Select2
                        className="select"
                        data={options1}
                        options={{
                          placeholder: 'Choose Suppliers',
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <label>Note</label>
                      <textarea className="form-control" defaultValue={''} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* show payment Modal */}
        {/* edit payment Modal */}
        <div
          className="modal fade"
          id="editpayment"
          tabIndex={-1}
          aria-labelledby="editpayment"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Payment</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Customer</label>
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className="addonset">
                          <img src={datepicker} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Reference</label>
                      <input type="text" defaultValue="INV/SL0101" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Received Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Paying Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Payment type</label>
                      <Select2
                        className="select"
                        data={options1}
                        options={{
                          placeholder: 'Choose Suppliers',
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <label>Note</label>
                      <textarea className="form-control" defaultValue={''} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SalesList;
