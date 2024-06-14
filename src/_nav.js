import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilCreditCard,
  cilSpeedometer,
  cilStar,
  cilCart,
  cilColorBorder,
  cilFactory,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Customers',
  },
  {
    component: CNavGroup,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Customer',
        to: '/customers/addCustomer',
      },
      {
        component: CNavItem,
        name: 'List',
        to: '/customers/listCustomer',
      },
      // {
      //   component: CNavItem,
      //   name: 'Group',
      //   to: '/customers/groupCustomer',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Transaction',
    to: '/transaction',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'New Deposit',
        to: '/transaction/NewDeposite',
      },
      {
        component: CNavItem,
        name: 'New Expense',
        to: '/transaction/NewExpense',
      },
      {
        component: CNavItem,
        name: 'Transfer',
        to: '/transaction/Transfer',
      },
      {
        component: CNavItem,
        name: 'View Transection',
        to: '/transaction/ViewTransaction',
      },
      {
        component: CNavItem,
        name: 'Balance Sheet',
        to: '/Transaction/BalanceSheet',
      },
      {
        component: CNavItem,
        name: 'Transfer Report',
        to: '/Transaction/TransferReport',
      },
    ],
    },
    {
      component: CNavGroup,
      name: 'Sales',
      to: '/sales',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Invoices',
          to: '/sales/Invoices',
        },
        {
          component: CNavItem,
          name: 'New Invoices',
          to: '/sales/NewInvoices',
        },
        {
          component: CNavItem,
          name: 'Recurring invoices',
          to: '/sales/RecurringInvoices',
        },
        {
          component: CNavItem,
          name: 'New Recurring invoices',
          to: '/sales/NewRecurringInvoices',
        },
        {
          component: CNavItem,
          name: 'quotes',
          to: '/sales/Quotes',
        },
        {
          component: CNavItem,
          name: 'New quote',
          to: '/sales/NewQuote',
        },
        {
          component: CNavItem,
          name: 'Payments',
          to: '/sales/Payments',
        },
        {
          component: CNavItem,
          name: 'Tax Rate',
          to: '/sales/TaxRate',
        },

      ],},

      {
        component: CNavGroup,
        name: 'Task',
        to: '/tasks',
        icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Runing Task',
            to: '/tasks/RuningTask',
          },
          {
            component: CNavItem,
            name: 'Archive Taask',
            to: '/tasks/ArchiveTask',
          },

        ],},
      // {
      //   component: CNavGroup,
      //   name: 'Report',
      //   to: '/reports',
      //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
      //   items: [
      //     {
      //       component: CNavItem,
      //       name: 'Project Report',
      //       to: '/reports/ProjectReport',
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Client Report',
      //       to: '/reports/ClientReport',
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Expense Report',
      //       to: '/reports/ExpenseReport',
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Income Expense Eomparesion',
      //       to: '/reports/IncomeExpenseEomparesion',
      //     },

      //   ],},
      {
        component: CNavGroup,
        name: 'Stocks',
        to: '/stocks',
        icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Stock Category',
            to: '/stocks/StockCategory',
          },
          {
            component: CNavItem,
            name: 'Manage Stock',
            to: '/stocks/ManageStock',
          },
          {
            component: CNavItem,
            name: 'Assign Stock',
            to: '/stocks/AssignStock',
          },

        ],},
]
export default _nav
