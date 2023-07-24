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
import { DateAndTimePicker } from "../components/dateAndTimePicker";
import { Authorization } from "../components/authorization";
import { Registration } from "../components/registration";
import { Activation } from "../components/activation";
import { ViewTicket } from "../components/viewTicket";
import { MyTickets } from "../components/myTickets";

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
        path: "registration",
        element: <Registration />,
      },
      {
        path: "activation",
        element: <Activation />,
      },
      {
        path: "authorization",
        element: <Authorization />,
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
      {
        path: 'datetime',
        element: <DateAndTimePicker />
      },
      {
        path: 'view',
        element: <ViewTicket />
      },
      {
        path: 'mytickets',
        element: <MyTickets />
      },
    ],
  },
]);
