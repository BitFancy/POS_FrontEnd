import React, { useEffect, useContext, useState } from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import FeatherIcon from 'feather-icons-react';
import { UserContext } from '../../context/UserContext';
import LoadingSpinner from './LoadingSpinner';
import useAuth from '../../hooks/useAuth';

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState('');
  const [path, setPath] = useState('');
  const history = useHistory();
  const { user } = useAuth();
  const { isAuthenticated } = useAuth();

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove('expand-menu');
  };
  const expandMenuOpen = () => {
    document.body.classList.add('expand-menu');
  };
  const pageRefresh = (url, page) => {
    history.push(`/dream-pos/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;

  useEffect(() => {
    document.querySelector('.main-wrapper').classList.remove('slide-nav');
    document.querySelector('.sidebar-overlay').classList.remove('opened');
    document.querySelector('.sidebar-overlay').onclick = function () {
      this.classList.remove('opened');
      document.querySelector('.main-wrapper').classList.remove('slide-nav');
    };
  }, [pathname]);
  const exclusionArray = [
    '/reactjs/template/dream-pos/index-three',
    '/reactjs/template/dream-pos/index-four',
    '/reactjs/template/dream-pos/index-two',
    '/reactjs/template/dream-pos/index-one',
  ];

  useEffect(() => {
    console.log('this is user info in sidebar', user);
  }, []);

  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return '';
  }

  // if (!user) {
  //   return <LoadingSpinner />;
  // }

  console.log(isAuthenticated, '-==========----=-=-=-=-=-=- is authenticated');

  console.log(user, '======================this is side bar user ----------');
  if (!user) {
    return '<LoadingSpinner />';
  }

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseOver={expandMenuOpen}
              onMouseLeave={expandMenu}
            >
              <ul>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Order Management</h6>
                  <ul>
                    <li>
                      <Link to="/pos">
                        <FeatherIcon icon="hard-drive" />
                        <span>Make Order</span>
                      </Link>
                    </li>
                    <li
                      className={pathname.includes('saleslist') ? 'active' : ''}
                    >
                      <Link
                        className={
                          pathname.includes('saleslist') ? 'active' : ''
                        }
                        to="/dream-pos/sales/saleslist"
                      >
                        <i data-feather="shopping-cart" />
                        <FeatherIcon icon="shopping-cart" />
                        <span>Order Lists</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Menu Management</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes('productlist-product') ? 'active' : ''
                      }
                    >
                      <Link
                        className={
                          pathname.includes('productlist-') ? 'active' : ''
                        }
                        to="/dream-pos/product/productlist-product"
                      >
                        <FeatherIcon icon="box" />
                        <span>Products</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes('categorylist-product')
                          ? 'active'
                          : ''
                      }
                    >
                      <Link
                        className={
                          pathname.includes('categorylist-') ? 'active' : ''
                        }
                        to="/dream-pos/product/categorylist-product"
                      >
                        <FeatherIcon icon="codepen" />
                        <span>Category</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes('importproduct-product')
                          ? 'active'
                          : ''
                      }
                    >
                      <Link
                        className={
                          pathname.includes('importproduct-') ? 'active' : ''
                        }
                        to="/dream-pos/product/importproduct-product"
                      >
                        <FeatherIcon icon="minimize-2" />
                        <span>Import Products</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li className="submenu-open">
                  <h6 className="submenu-hdr">Reports</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes('salesreport') ? 'active' : ''
                      }
                    >
                      <Link
                        to="/dream-pos/report/salesreport"
                        className={
                          pathname.includes('salesreport') ? 'active' : ''
                        }
                      >
                        <FeatherIcon icon="bar-chart-2" />
                        <span>Order Report</span>
                      </Link>
                    </li>

                    <li
                      className={
                        pathname.includes('inventoryreport') ? 'active' : ''
                      }
                    >
                      <Link
                        to="/dream-pos/report/inventoryreport"
                        className={
                          pathname.includes('inventoryreport') ? 'active' : ''
                        }
                      >
                        <FeatherIcon icon="credit-card" />
                        <span>Inventory Report</span>
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {user.role !== 'User' && (
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Admin Panel</h6>
                    <ul>
                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes('/dream-pos/users')
                              ? 'subdrop active'
                              : '' || isSideMenu == 'Users'
                              ? 'subdrop active'
                              : ''
                          }
                          onClick={() =>
                            toggleSidebar(isSideMenu == 'Users' ? '' : 'Users')
                          }
                        >
                          <FeatherIcon icon="users" />
                          <span>Manage Users</span>{' '}
                          <span className="menu-arrow" />
                        </Link>
                        {isSideMenu == 'Users' ? (
                          <ul>
                            <li>
                              <Link
                                to="/dream-pos/users/userlists"
                                className={
                                  pathname.includes('userlists') ? 'active' : ''
                                }
                              >
                                Users
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/users/customerlists"
                                className={
                                  pathname.includes('customerlists')
                                    ? 'active'
                                    : ''
                                }
                              >
                                Customers
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ''
                        )}
                      </li>
                      <li>
                        <Link
                          to="/dream-pos/settings/generalsettings"
                          className={
                            pathname.includes('generalsettings') ? 'active' : ''
                          }
                        >
                          <FeatherIcon icon="settings" />
                          General Settings
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
