import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PincodeEntryPage } from '../components/pincodeEntry'
import { ServicePicker } from "../components/servicePicker";
import { ClientInfo } from "../components/clientPicker";
import { DocumentsList } from "../components/documentsList";
import { Error } from "../components/error";
import { CityPicker } from "../components/cityPicker";
import { BranchPicker } from "../components/branchPicker";
import { BranchSchedule } from "../components/branchSchedule";
import { TicketTypePicker } from "../components/ticketTypePicker";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App errorOutlet={ <Error /> } />,
    children: [
      {
        path: "",
        element: <CityPicker />,
      },
      {
        path: "branch",
        element: <BranchPicker />,
      },
      {
        path: "schedule",
        element: <BranchSchedule />,
      },
      {
        path: "entry",
        element: <PincodeEntryPage />,
      },
      {
        path: 'service',
        element: <ServicePicker />
      },
      {
        path: 'client',
        element: <ClientInfo />
      },
      {
        path: 'documents',
        element: <DocumentsList />
      },
      {
        path: 'ticket',
        element: <TicketTypePicker />
      },
    ],
  },
]);
