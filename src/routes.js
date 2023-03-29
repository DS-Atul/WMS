import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

// Authentication
const SignIn = React.lazy(() =>
  import("./screens/authentication/signin/SignIn.js")
);

const ResetPassword = React.lazy(() =>
  import("./screens/authentication/resetpassword/ResetPassword.js")
);
const ForgetPassword = React.lazy(() =>
  import("./screens/authentication/forgetPassword/ForgetPassword.js")
);

// Test
const Test = React.lazy(() => import("./screens/test/Test.js"));
const TestImport = React.lazy(() => import("./screens/test/TestImport.js"));

//Dashboard
const Dashboard = React.lazy(() => import("./screens/dashboard/Dashboard.js"));

// 404
const Page_Not_Found = React.lazy(() =>
  import("./screens/utilities/page404/Page404.js")
);

// EMS
const LoginDetails = React.lazy(() =>
  import("./screens/ems/loginDetails/LoginDetails.js")
);
const Users = React.lazy(() => import("./screens/ems/users/Users.js"));
const UserInfo = React.lazy(() => import("./screens/ems/users/UserInfo.js"));
const AddDepertment = React.lazy(() =>
  import("./screens/ems/department/AddDepartment.js")
);
const Department = React.lazy(() =>
  import("./screens/ems/department/Department.js")
);
const Designation = React.lazy(() =>
  import("./screens/ems/designation/Designation.js")
);
const AddDesignation = React.lazy(() =>
  import("./screens/ems/designation/AddDesignation.js")
);

//Profile

const Profile = React.lazy(() => import("./screens/authentication/userProfile/Profile.js"));
//vehicle
const Model = React.lazy(() => import("./screens/vms/vehicleModel/Model.js"));
const AddModel = React.lazy(() =>
  import("./screens/vms/vehicleModel/AddModel.js")
);
const AddVehicleEngine = React.lazy(() =>
  import("./screens/vms/vehicleEngine/AddVehicleEngine.js")
);
const AddVehicleDimension = React.lazy(() =>
  import("./screens/vms/vehicleDimension/AddVehicleDimension.js")
);
const AddModelPerformance = React.lazy(() =>
  import("./screens/vms/VehicleModelPerformance/AddModelPerformance.js")
);
const AddModelFuelEconomy = React.lazy(() =>
  import("./screens/vms/VehicleModelFuelEconomy/AddModelFuelEconomy.js")
);
const AddModelWeight = React.lazy(() =>
  import("./screens/vms/vehicleModelWeight/AddModelWeight.js")
);
const AddVehicleInspection = React.lazy(() =>
  import("./screens/vms/vehicleInspection/AddVehicleInspection.js")
);
const AddVehicleTransmission = React.lazy(() =>
  import("./screens/vms/vehicleTransmission/AddVehicleTransmission.js")
);
const AddVehicleWheel = React.lazy(() =>
  import("./screens/vms/vehicleWheels/AddVehicleWheel.js")
);

// Calendar


//vms
const Vehicle = React.lazy(() => import("./screens/vms/Vehicle/Vehicle.js"));
const AddVehicle = React.lazy(() =>
  import("./screens/vms/Vehicle/AddVehicle.js")
);
const Tabs = React.lazy(() => import("./screens/vms/Vehicle/Tab/Tabs.js"));

//Trip
const Transporter = React.lazy(() =>
  import("./screens/trip/transporter/Transporter.js")
);
const AddTransporter = React.lazy(() =>
  import("./screens/trip/transporter/AddTransporter.js")
);

//hired
const HiredDetails = React.lazy(() =>
  import("./screens/trip/hiredDetails/HiredDetails.js")
);

// Master
const Assets = React.lazy(() => import("./screens/master/assets/Assets.js"));

const AssigneBranch = React.lazy(() =>
  import("./screens/master/assets/AssigneBranch.js")
);

const AddAsset = React.lazy(() =>
  import("./screens/master/assets/AddAsset.js")
);

const Commodities = React.lazy(() =>
  import("./screens/master/commodities/Commodities.js")
);

const AddCommodity = React.lazy(() =>
  import("./screens/master/commodities/AddCommodity.js")
);

const CommodityHistoryPage = React.lazy(() => import("./screens/master/commodities/commodityHistory/CommodityHistoryPage.js"));

const Charges = React.lazy(() => import("./screens/master/charges/Charges.js"));

const AddCharge = React.lazy(() =>
  import("./screens/master/charges/AddCharge.js")
);

const ChargeHistoryPage = React.lazy(() => import("./screens/master/charges/chargesHistory/ChargeHistoryPage.js"));

const BillTos = React.lazy(() => import("./screens/master/billtos/BillTos.js"));

const AddBillTo = React.lazy(() =>
  import("./screens/master/billtos/AddBillTo.js")
);
 const BilltoHistoryPage = React.lazy(() => import("./screens/master/billtos/billtoHistory/BilltoHistoryPage.js"));

const AddClient = React.lazy(() =>
  import("./screens/master/customers/AddClient.js")
);
// TO Import City TO City Billing Info
const ImportCityData = React.lazy(() =>
  import("./screens/master/customers/ImportCityData.js")
);

// To Import Local Billing Data
const ImportLocalAssoData = React.lazy(() =>
  import("./screens/master/customers/ImportLocalAssoData.js")
);

const Branches = React.lazy(() =>
  import("./screens/master/branches/Branches.js")
);

const AddBranch = React.lazy(() =>
  import("./screens/master/branches/AddBranch.js")
);

const BranchHistoryPage = React.lazy(() => import("./screens/master/branches/branchHistory/BranchHistoryPage.js"));

const Locations = React.lazy(() =>
  import("./screens/master/locations/Locations.js")
);

const AddLocation = React.lazy(() =>
  import("./screens/master/locations/AddLocation.js")
);

const Routes = React.lazy(() => import("./screens/master/route/Routes.js"));

const AddRoute = React.lazy(() => import("./screens/master/route/AddRoute.js"));

const Vendor = React.lazy(() => import("./screens/master/vendor/Vendor.js"));
const AddVendor = React.lazy(() =>
  import("./screens/master/vendor/AddVendor.js")
);
const VendorHistoryPage = React.lazy(() => import("./screens/master/vendor/vendorHistory/VendorHistoryPage.js"));

const OrderOrigins = React.lazy(() =>
  import("./screens/master/orderOrigins/OrderOrigins.js")
);

const AddOrderOrigin = React.lazy(() =>
  import("./screens/master/orderOrigins/AddOrderOrigin.js")
);

const OrderOriginsHistoryPage = React.lazy(() => import("./screens/master/orderOrigins/orderOriginsHistory/OrderOriginsHistoryPage.js"));

const Organization = React.lazy(() =>
  import("./screens/organization/organization/Organization.js")
);

const AddOrganization = React.lazy(() =>
  import("./screens/organization/organization/AddOrganization.js")
);

// Booking
const Orders = React.lazy(() => import("./screens/booking/orders/Orders.js"));

const AddOrder = React.lazy(() =>
  import("./screens/booking/orders/AddOrder.js")
);
const AddDocketStatus = React.lazy(() =>
  import("./screens/booking/docketstatus/AddDocketStatus.js")
);

const OrderInvoicePdf = React.lazy(() =>
  import("./screens/booking/orders/OrderInvoicePdf.js")
);

//Delivery Info

const DeliveryInfo = React.lazy(() =>
  import("./screens/booking/deliveryInfo/DeliveryInfo.js")
);

const UpdateDeliveryInfo = React.lazy(() =>
  import("./screens/booking/deliveryInfo/UpdateDeliveryInfo.js")
);

//Order Checking page
const OrderCheckingPage = React.lazy(() =>
  import("./screens/booking/orderCheckingPage/OrderCheckingPage.js")
);

// Runsheet
const AllRunsheet = React.lazy(() =>
  import("./screens/runsheet/AllRunsheet.js")
);
const PendingToDelivery = React.lazy(() =>
  import("./screens/runsheet/pendingToDelivery/PendingToDelivery.js")
);
const ChangedRusheet = React.lazy(() =>
  import("./screens/runsheet/ChangedRunsheet.js")
);

const CreateRunsheet = React.lazy(() =>
  import("./screens/runsheet/pendingToDelivery/CreateRunsheet.js")
);

const RunsheetPDF = React.lazy(() =>
  import("./screens/runsheet/runsheetPdf/RunsheetPDF.js")
);

//  Manifests
const PendingForDispatch = React.lazy(() =>
  import("./screens/manifest/pendingfordispatch/PendingForDispatch.js")
);
const Forwarding = React.lazy(() =>
  import("./screens/manifest/forwardmanifest/Forwarding.js")
);
const AddForwarding = React.lazy(() =>
  import("./screens/manifest/forwardmanifest/AddForward.js")
);
const ManifestPdf = React.lazy(() =>
  import("./data/manifests/pendingForDispatch/manifests/ManifestPdf.js")
);
const PendingDepart = React.lazy(() =>
  import("./screens/manifest/pendingDepart/PendingDepart.js")
);
const IncomingManifest = React.lazy(() =>
  import("./screens/manifest/incomingManifest/IncomingManifest.js")
);

const EditManifest = React.lazy(() =>
  import("./screens/manifest/editManifest/EditManifest.js")
);
const EditRoughDocket = React.lazy(() =>
  import("./screens/manifest/editManifest/EditRoughDocket.js")
);

const EditHub = React.lazy(() =>
  import("./screens/manifest/editHub/EditHub.js")
);
const ReciveManifest = React.lazy(() =>
  import("./screens/manifest/recieveManifest/ReciveManifest.js")
);
const RecieveHubManifest = React.lazy(() =>
  import("./screens/manifest/recieveHubManifest/ReciveHubManifest.js")
);
const RecieveHub = React.lazy(() =>
  import("./screens/manifest/incomingManifest/IncomingHub.js")
);
const AllManifest = React.lazy(() =>
  import("./screens/manifest/allmanifest/AllManifest.js")
);
const RoughManifestPdf = React.lazy(() =>
  import("./data/manifests/roughManifest/ManifestPdf.js")
);
const BranchForwarding = React.lazy(() =>
import("./screens/manifest/forwardbranchmanifest/BranchForwarding.js")
);
const PdfBranchForward = React.lazy(() =>
import("./data/manifests/branchManifest/BranchManifestPdf.js")
);
const AddBranchForward = React.lazy(() =>
import("./screens/manifest/forwardbranchmanifest/AddBranchForward.js")
);

const DocketIssue = React.lazy(() => import("./screens/booking/docketIssue/DocketIssue.js"));
const AddDocketIssue = React.lazy(() => import("./screens/booking/docketIssue/AddDocketIssue.js"));

// Manifest Ended
// Billing
const BillCloseds = React.lazy(() =>
  import("./screens/billing/billClosed/BillCloseds.js")
);
const AddBillClosed = React.lazy(() =>
  import("./screens/billing/billClosed/AddBillClosed.js")
);
const Waraies = React.lazy(() => import("./screens/billing/warai/Waraies.js"));
const AddWarai = React.lazy(() =>
  import("./screens/billing/warai/AddWarai.js")
);
const Invoices = React.lazy(() =>
  import("./screens/billing/invoice/Invoices.js")
);
const AddInvoice = React.lazy(() =>
  import("./screens/billing/invoice/AddInvoice.js")
);
const InvoicePdf = React.lazy(() =>
  import("./screens/billing/invoice/invoicePdf/InvoicePdf.js")
);

//For History Page in commodity
const HistoryPage = React.lazy(() =>
  import("./screens/utilities/historyPage/HistoryPage.js")
);

// Trackin Order Page
const TrackingOrder = React.lazy(() =>
  import("./screens/track/trackingPage/TrackingOrder.js")
);
//order
const OrderDetails = React.lazy(() =>
  import("./screens/dashboard/DashboardTypes/OrderDetails.js")
);
const BranchDailyDetails = React.lazy(() =>
  import("./screens/dashboard/DashboardTypes/BranchDailyDetails.js")
);
//test
const Sample = React.lazy(() => import("./screens/dashboard/Sample.js"));

// Calender
const Calender = React.lazy(() => import("./screens/dashboard/Calendar/Calendar.js"));
// Routes
const auth_routes = [
  { path: "/signin", element: <SignIn /> },
  { path: "/", exact: true, element: <Navigate to="/signin" /> },
  { path: "/dashboard", element: <Navigate to="/signin" /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  // { path: "/forgetpassword", element: <ForgetPassword /> },
  { path: "/track/trackingPage/TrackingOrder", element:<TrackingOrder />,
  },
];

const routes = [
  { path: "/signin", element: <Navigate to="/dashboard" /> },
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "/dashboard", element: <Dashboard /> },

  { path: "/404", element: <Page_Not_Found /> },
  { path: "*", element: <Navigate to="/404" replace /> },

  // Test
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/testImport",
    element: <TestImport />,
  },
  // Ems
  {
    path: "/ems/logindetails/logindetails",
    element: <LoginDetails />,
  },
  {
    path: "/ems/users",
    element: <Users />,
  },
  {
    path: "/ems/users/Userinfo",
    element: <UserInfo />,
  },
  {
    path: "/ems/department/adddepartment",
    name: "AddDepartment",
    element: <AddDepertment />,
  },
  {
    path: "/ems/department",
    name: "Department",
    element: <Department />,
  },
  {
    path: "/ems/designation",
    name: "Designation",
    element: <Designation />,
  },
  {
    path: "/ems/designation/adddesignation",
    name: "Adddesignation",
    element: <AddDesignation />,
  },
  //veicle model
  {
    path: "/vehicleModel/Model",
    element: <Model />,
  },
  {
    path: "/vehicleModel/AddModel",
    element: <AddModel />,
  },
  {
    path: "/vehicleEngine/AddVehicleEngine",
    element: <AddVehicleEngine />,
  },
  {
    path: "/vehicleDimension/AddVehicleDimension",
    element: <AddVehicleDimension />,
  },
  {
    path: "/VehicleModelPerformance/AddModelPerformance",
    element: <AddModelPerformance />,
  },
  {
    path: "/VehicleModelFuelEconomy/AddModelFuelEconomy",
    element: <AddModelFuelEconomy />,
  },
  {
    path: "/vehicleModelWeight/AddModelWeight",
    element: <AddModelWeight />,
  },
  {
    path: "/vehicleInspection/AddVehicleInspection",
    element: <AddVehicleInspection />,
  },
  {
    path: "/vehicleTransmission/AddVehicleTransmission",
    element: <AddVehicleTransmission />,
  },
  {
    path: "/vehicleWheels/AddVehicleWheel",
    element: <AddVehicleWheel />,
  },

  //vms
  {
    path: "/Vehicle/Vehicle",
    element: <Vehicle />,
  },
  {
    path: "/Vehicle/AddVehicle",
    element: <AddVehicle />,
  },
  {
    path: "/Vehicle/Tab/Tabs",
    element: <Tabs />,
  },

  //trip
  {
    path: "/transporter/Transporter",
    element: <Transporter />,
  },
  {
    path: "/transporter/AddTransporter",
    element: <AddTransporter />,
  },

  //hired
  {
    path: "/hiredDetails/HiredDetails",
    element: <HiredDetails />,
  },

  // Master
  {
    path: "/master/assets",
    element: <Assets />,
  },
  {
    path: "/master/assets/assignbranch",
    element: <AssigneBranch />,
  },
  {
    path: "/master/add-asset",
    element: <AddAsset />,
  },
  {
    path: "/master/commodities",
    element: <Commodities />,
  },
  {
    path: "/master/commodities/addcommodity",
    element: <AddCommodity />,
  },
  {
    path: "/master/commodities/addcommodities/:id",
    element: <AddCommodity />,
  },
  {
    path: "/master/commodities/commodityHistory/CommodityHistoryPage",
    element: <CommodityHistoryPage/>,
  },
  {
    path: "/master/charges",
    element: <Charges />,
  },
  {
    path: "/master/charges/addcharge",
    element: <AddCharge />,
  },
  {
    path: "/master/charges/chargesHistory/ChargeHistoryPage",
    element : <ChargeHistoryPage/>,
  },
  {
    path: "/master/billtos",
    element: <BillTos />,
  },
  {
    path: "/master/billtos/addbillto",
    element: <AddBillTo />,
  },
  {
    path:"/master/billtos/billtoHistory/BilltoHistoryPage",
    element:<BilltoHistoryPage/>
  },
  {
    path: "/master/clients/addclient",
    element: <AddClient />,
  },
  {
    path: "/customers/ImportCityData",
    element: <ImportCityData />,
  },
  {
    path: "/customers/importlocalassodata",
    element: <ImportLocalAssoData />,
  },
  {
    path: "/master/branches",
    element: <Branches />,
  },
  {
    path: "/master/branches/addbranch",
    element: <AddBranch />,
  },
  {
    path:"/master/branches/branchHistory/BranchHistoryPage",
    element: <BranchHistoryPage/>,
  },
  {
    path: "/master/locations",
    element: <Locations />,
  },
  {
    path: "/master/locations/addlocation",
    element: <AddLocation />,
  },
  {
    path: "/master/routes",
    element: <Routes />,
  },
  {
    path: "/master/routes/addroute",
    element: <AddRoute />,
  },
  {
    path: "/master/vendor/Vendor",
    element: <Vendor />,
  },
  {
    path: "/master/vendor/AddVendor",
    element: <AddVendor />,
  },
  {
    path: "/master/vendor/vendorHistory/VendorHistoryPage",
    element: <VendorHistoryPage/>,
  },
  {
    path: "/master/orderorigins",
    element: <OrderOrigins />,
  },
  {
    path: "/master/orderorigins/addorderorigin",
    element: <AddOrderOrigin />,
  },
  {
    path:"/master/orderOrigins/orderOriginsHistory/OrderOriginsHistoryPage",
    element: <OrderOriginsHistoryPage/>,
  },
  {
    path: "/organization/organization",
    element: <Organization />,
  },
  {
    path: "/organization/AddOrganization",
    element: <AddOrganization />,
  },

  // Booking
  {
    path: "/booking/orders",
    element: <Orders />,
  },
  {
    path: "/booking/orders/addorder",
    element: <AddOrder />,
  },
  {
    path: "/booking/orders/OrderInvoicePdf",
    element: <OrderInvoicePdf />,
  },
  {
    path: "/booking/orders/adddocketstatus",
    element: <AddDocketStatus />,
  },
  {
    path: "/booking/updatedeliveryinfo",
    element: <UpdateDeliveryInfo />,
  },
  {
    path: "/booking/deliveryinfo",
    element: <DeliveryInfo />,
  },

  //Runsheet
  {
    path: "/runsheet/allrunsheet",
    element: <AllRunsheet />,
  },
  {
    path: "/runsheet/pendingdelivery",
    element: <PendingToDelivery />,
  },
  {
    path: "/runsheet/changedrunsheet",
    element: <ChangedRusheet />,
  },
  {
    path: "/runsheet/createdrunsheet",
    element: <CreateRunsheet />,
  },
  {
    path: "/runsheet/runsheetPdf/RunsheetPDF",
    element: <RunsheetPDF />,
  },

  // Manifest
  {
    path: "/manifest/pendingfordispatch",
    element: <PendingForDispatch />,
  },
  {
    path: "/manifest/roughmanifest",
    element: <Forwarding />,
  },
  {
    path: "/manifest/branchforward",
    element: <AddBranchForward />,
  },
  {
    path: "/manifest/branchmanifest",
    element: <BranchForwarding />,
  },
  {
    path: "/manifest/branch_pdf",
    element: <PdfBranchForward />,
  },
  {
    path: "/manifest/forward",
    element: <AddForwarding />,
  },
  {
    path: "/manifest/manifestPdf",
    element: <ManifestPdf />,
  },
  {
    path: "/manifest/pendingtodepart",
    element: <PendingDepart />,
  },
  {
    path: "/manifest/incomingmanifest",
    element: <IncomingManifest />,
  },
  {
    path: "/manifest/editmanifest",
    element: <EditManifest />,
  },
  {
    path: "/manifest/editraughdocket",
    element: <EditRoughDocket/>,
  },
  {
    path: "/manifest/edithub",
    element: <EditHub />,
  },
  {
    path: "/manifest/recieve_hub_manifest",
    element: <RecieveHubManifest />,
  },
  {
    path: "/manifest/incominghub",
    element: <RecieveHub />,
  },
  {
    path: "/manifest/recieve_manifest",
    element: <ReciveManifest />,
  },
  {
    path: "/manifest/allmanifest",
    element: <AllManifest />,
  },
  {
    path: "/manifest/roughmanfest",
    element: <RoughManifestPdf />,
  },
  {
    path: "/booking/docketIssue/DocketIssue",
    element: <DocketIssue/>,
  },
  {
    path: "/booking/docketIssue/AddDocketIssue",
    element: <AddDocketIssue/>,
  },

  // Billings
  {
    path: "/billing/billclosed",
    element: <BillCloseds />,
  },
  {
    path: "/billing/billclosed/addbillclosed",
    element: <AddBillClosed />,
  },
  {
    path: "/billing/waraies",
    element: <Waraies />,
  },
  {
    path: "/billing/waraies/addwarai",
    element: <AddWarai />,
  },
  {
    path: "/billing/invoices",
    element: <Invoices />,
  },
  {
    path: "/billing/invoices/addinvoice",
    element: <AddInvoice />,
  },
  {
    path: "/billing/invoices/invoice_pdf",
    element: <InvoicePdf />,
  },
  {
    path: "/utilities/historyPage/HistoryPage",
    element: <HistoryPage />,
  },

  // Billings
  {
    path: "/billing/billclosed",
    element: <BillCloseds />,
  },
  {
    path: "/billing/billclosed/addbillclosed",
    element: <AddBillClosed />,
  },
  {
    path: "/billing/waraies",
    element: <Waraies />,
  },
  {
    path: "/billing/waraies/addwarai",
    element: <AddWarai />,
  },
  {
    path: "/billing/invoices",
    element: <Invoices />,
  },
  {
    path: "/billing/invoices/addinvoice",
    element: <AddInvoice />,
  },
  {
    path: "/billing/invoices/invoice_pdf",
    element: <InvoicePdf />,
  },

  {
    path: "/Sample",
    element: <Sample />,
  },
  {
    path: "/orderCheckingPage/OrderCheckingPage",
    element: <OrderCheckingPage />,
  },
  {
    path: "/dashboard/DashboardTypes/OrderDetails",
    element: <OrderDetails />,
  },

  
  {
    path: "/DashboardTypes/BranchDailyDetails",
    element: <BranchDailyDetails />,
  },
  {
    path: "/authentication/userProfile/Profile",
    element: <Profile/>,
  },
  {
    path: "/dashboard/Calendar/Calendar",
    element: <Calender/>,
  },
  
];

export { auth_routes, routes };
