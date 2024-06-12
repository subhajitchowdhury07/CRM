import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
// const AllProducts = React.lazy(() => import('./views/products/AllProducts'))
// const AddNewProducts = React.lazy(() => import('./views/products/AddNewProducts'))
// const AddCar = React.lazy(() => import('./views/Car/AddCar'))
const addCustomer = React.lazy(() => import('./views/customers/addCustomer'))
const listCustomer = React.lazy(() => import('./views/customers/listCustomer'))
// const groupCustomer = React.lazy(() => import('./views/customers/groupCustomer'))
const NewDeposite = React.lazy(() => import('./views/transaction/NewDeposite'))
const NewExpense = React.lazy(() => import('./views/transaction/NewExpense'))
const Transfer = React.lazy(() => import('./views/transaction/Transfer'))
const ViewTransection = React.lazy(() => import('./views/transaction/ViewTransaction'))
const BalanceSheet = React.lazy(() => import('./views/transaction/BalanceSheet'))
const TransferReport = React.lazy(() => import('./views/transaction/TransferReport'))

//sales
const Invoices = React.lazy(() => import('./views/sales/Invoices'))
const NewInvoices = React.lazy(() => import('./views/sales/NewInvoices'))
const RecurringInvoices = React.lazy(() => import('./views/sales/RecurringInvoices'))
const NewRecurringInvoices = React.lazy(() => import('./views/sales/NewRecurringInvoices'))
const Quotes = React.lazy(() => import('./views/sales/Quotes'))
const NewQuote = React.lazy(() => import('./views/sales/NewQuote'))
const Payments = React.lazy(() => import('./views/sales/Payments'))
const TaxRate = React.lazy(() => import('./views/sales/TaxRate'))

//Srocks
const StockCategory = React.lazy(() => import('./views/stocks/StockCategory'))
const ManageStock = React.lazy(() => import('./views/stocks/ManageStock'))
const AssignStock = React.lazy(() => import('./views/stocks/AssignStock'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  // { path: '/customer', name: 'Products', elem },
  { path: '/customers/addCustomer', name: 'Add Customer', element: addCustomer },
  { path: '/customers/listCustomer', name: 'List', element: listCustomer },
  // { path: '/customers/groupCustomer', name: 'Group', element: groupCustomer },
  // { path: '/Car/AddCar', name: 'Add Car', element: AddCar },
  { path: '/transaction/NewDeposite', name: 'transaction', element: NewDeposite },
  { path: '/transaction/NewExpense', name: 'transaction', element: NewExpense },
  { path: '/transaction/Transfer', name: 'transaction', element: Transfer },
  { path: '/transaction/ViewTransaction', name: 'transaction', element: ViewTransection },
  { path: '/transaction/BalanceSheet', name: 'transaction', element: BalanceSheet },
  { path: '/transaction/TransferReport', name: 'transaction', element: TransferReport },
  //sales
  { path: '/sales/Invoices', name: 'sales', element: Invoices },
  { path: '/sales/NewInvoices', name: 'sales', element: NewInvoices },
  { path: '/sales/RecurringInvoices', name: 'sales', element: RecurringInvoices },
  { path: '/sales/NewRecurringInvoices', name: 'sales', element: NewRecurringInvoices },
  { path: '/sales/Quotes', name: 'sales', element: Quotes },
  { path: '/sales/NewQuote', name: 'sales', element: NewQuote },
  { path: '/sales/Payments', name: 'sales', element: Payments },
  { path: '/sales/TaxRate', name: 'sales', element: TaxRate },

  //Stocks
  { path: '/stocks/StockCategory', name: 'stocks', element: StockCategory },
  { path: '/stocks/ManageStock', name: 'stocks', element: ManageStock },
  { path: '/stocks/AssignStock', name: 'stocks', element:AssignStock },
  
]

export default routes
