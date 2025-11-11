import EntityLayout from "../../../layouts/EntityLayout/EntityLayout";
import TransactionSection from "../components/TransactionSection";
import { transactionPermissionsProvider } from "../services/transactionsClient";
import { useState } from "react";
import { Tab, Tabs } from "@/components/Tabs";
import { Modal } from "@/components/Modal";
import ClosePeriodForm from "../components/ClosePeriodForm";
import { TransactionType } from "../models/transactionType";
import { createReportLayoutOption } from "@/features/Reports/lib/utils";

const TransactionsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EntityLayout
        title="Transacciones"
        permissionsProvider={transactionPermissionsProvider}
        extraOptions={[
          {
            title: "Cerrar Período",
            icon: "close",
            onClick: () => setShowModal(true),
          },
          createReportLayoutOption("transaction"),
        ]}
        create={true}
        showChooseProjectBtn={true}
      >
        <Tabs defaultActiveKey="all">
          <Tab path="all" title="Transacciones">
            <TransactionSection navigate={true} />
          </Tab>
          <Tab path="incomes" title="Ingresos">
            <TransactionSection navigate={true} type={TransactionType.PC} />
          </Tab>
          <Tab path="expenses" title="Egresos">
            <TransactionSection navigate={true} type={TransactionType.DS} />
          </Tab>
          <Tab path="overdue" title="Cuotas Atrasadas">
            <TransactionSection navigate={true} isLate={true} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Cerrar Período"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <ClosePeriodForm />
      </Modal>
    </>
  );
};

export default TransactionsPage;
